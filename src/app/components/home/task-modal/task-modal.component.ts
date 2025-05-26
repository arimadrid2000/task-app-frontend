import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent {
  isMobile = false;
  dialogWidth = '95vw'; // Valor por defecto para móvil

  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pendiente', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private breakpointObserver: BreakpointObserver
  ) {
    if (data?.task) {
      this.taskForm.patchValue(data.task);
    }

    // Configuración responsive inicial
    this.checkViewportSize();

    // Observador de breakpoints
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      this.isMobile = result.matches;
      this.adjustDialogSize();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewportSize();
  }

  private checkViewportSize() {
    const width = window.innerWidth;
    this.isMobile = width < 768; // Tailwind's md breakpoint
    this.adjustDialogSize();
  }

  private adjustDialogSize() {
    if (this.isMobile) {
      this.dialogRef.updateSize('95vw', 'auto');
    } else {
      this.dialogRef.updateSize('500px', 'auto');
    }
  }

  submit() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
