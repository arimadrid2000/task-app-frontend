import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-modal.component.html',
})
export class TaskModalComponent {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['pending', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.task) {
      this.taskForm.patchValue(data.task);
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
