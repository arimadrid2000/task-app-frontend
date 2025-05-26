import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Mock TaskService
const mockTaskService = {
  getTasks: jasmine.createSpy('getTasks').and.returnValue(of([
    { id: '1', title: 'Tarea 1', description: 'Desc 1', status: 'pending', createdAt: { _seconds: 123456789 } }
  ])),
  updateTask: jasmine.createSpy('updateTask').and.returnValue(of({})),
  deleteTask: jasmine.createSpy('deleteTask').and.returnValue(of({})),
  createTask: jasmine.createSpy('createTask').and.returnValue(of({}))
};

// Mock MatDialog
const mockDialogRef = {
  afterClosed: () => of({ title: 'Nueva', description: 'desc', status: 'pending' })
};

const mockDialog = {
  open: jasmine.createSpy('open').and.returnValue(mockDialogRef)
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        HttpClientTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar tareas al iniciar', () => {
    expect(mockTaskService.getTasks).toHaveBeenCalled();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Tarea 1');
  });

  it('debería alternar el estado de una tarea', () => {
    const task: Task = {
      id: '1',
      title: 'Tarea 1',
      description: 'Desc 1',
      status: 'pendiente',
    };

    component.toggleTaskStatus(task);
    expect(mockTaskService.updateTask).toHaveBeenCalledWith('1', jasmine.objectContaining({
      status: 'completed'
    }));
  });

  it('debería eliminar una tarea', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteTask('1');
    expect(mockTaskService.deleteTask).toHaveBeenCalledWith('1');
  });
});
