import { Component, HostListener, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'


const DISPLAYED_COLUMNS = ['title', 'description', 'status', 'createdAt', 'actions'];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  completed: 'Completado'
};

const STATUS_COLORS: Record<string, string> = {
  'completada': 'primary',
  'en progreso': 'accent',
  'pendiente': 'warn'
};
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    TaskModalComponent,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  displayedColumns = DISPLAYED_COLUMNS;
  displayedMobileColumns: string[] = ['title', 'status', 'mobileActions'];
  dataSource = new MatTableDataSource<Task>([]);
  private userId = '';
  isSmallScreen = false;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.displayedColumns = window.innerWidth < 640 ?
      this.displayedMobileColumns :
      ['title', 'description', 'status', 'createdAt', 'actions'];
  }

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.fetchTasksFromServer();
    this.isSmallScreen = window.innerWidth < 640;
  }

  fetchTasksFromServer(): void {
    this.taskService.getTasks(this.userId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.dataSource.data = data;
      },
      error: () => {
        this.snackBar.open('Error al cargar tareas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getStatusColor(status: string): string {
    return STATUS_COLORS[status.toLowerCase()] || '';
  }

  getStatusLabel(status: string): string {
    return STATUS_LABELS[status] || status;
  }

  toggleTaskStatus(task: Task): void {
    if (!task.id) {
      this.snackBar.open('Error: La tarea no tiene ID válido', 'Cerrar', { duration: 3000 });
      return;
    }

    const updatedTask: Task = {
      ...task,
      status: task.status === 'completado' ? 'pendiente' : 'completado',
    };


    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', { duration: 2000 });
        this.fetchTasksFromServer();
      },
      error: () => {
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '95vw',
      maxWidth: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const action$ = task?.id
          ? this.taskService.updateTask(task.id, result)
          : this.taskService.createTask({ ...result, userId: this.userId });

        action$.subscribe({
          next: () => this.fetchTasksFromServer(),
          error: () => this.snackBar.open('Error al guardar la tarea', 'Cerrar', { duration: 3000 })
        });
      }
    });
  }

  deleteTask(id: string): void {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => this.fetchTasksFromServer(),
      error: () => this.snackBar.open('Error al eliminar la tarea', 'Cerrar', { duration: 3000 })
    });
  }

  returnToLogin() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}

