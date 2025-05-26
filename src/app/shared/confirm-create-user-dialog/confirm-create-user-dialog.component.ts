import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Necesario para componentes standalone
import { MatCardModule } from '@angular/material/card'; // Para un estilo bonito del diálogo

@Component({
  selector: 'app-confirm-create-user-dialog',
  templateUrl: './confirm-create-user-dialog.component.html',
  styleUrl: './confirm-create-user-dialog.component.scss',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule]
})
export class ConfirmCreateUserDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmCreateUserDialogComponent>) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
