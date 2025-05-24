import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/tasks/${userId}`);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(`${BASE_URL}/tasks`, task);
  }

  updateTask(taskId: string, task: Partial<Task>): Observable<any> {
    return this.http.put(`${BASE_URL}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${BASE_URL}/tasks/${taskId}`);
  }
}
