import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TaskModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  userId = localStorage.getItem('userId') || '';

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

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
      width: '400px',
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
}
