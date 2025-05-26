import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatListModule,
    TaskModalComponent,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTable,
    MatTableModule,
  MatDialogModule],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['Título', 'Descripción', 'Estado', 'Fecha de creación', 'Acciones'];

  @ViewChild(MatTable)
  table!: MatTable<Task>;
  tasks: Task[] = [];

  userId = localStorage.getItem('userId') || '';

  constructor(private taskService: TaskService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks(this.userId).subscribe(data => {
      this.tasks = data;
    });
  }

  openTaskDialog(task?: Task) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '600px',
      height: 'auto',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task?.id) {
          this.taskService.updateTask(task.id, result).subscribe(() => this.loadTasks());
        } else {
          this.taskService.createTask({ ...result, userId: this.userId }).subscribe(() => this.loadTasks());
        }
      }
    });
  }

  deleteTask(id: string) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  returnToLogin() {
    this.router.navigate(['/']);
  }
}
