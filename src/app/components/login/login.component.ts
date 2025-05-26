import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmCreateUserDialogComponent } from '../../shared/confirm-create-user-dialog/confirm-create-user-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   email = '';
   constructor(private auth: AuthService, private router: Router, private dialog: MatDialog) {}

  login() {
    this.auth.login(this.email).subscribe({
      next: user => {
        this.saveSession(user);
        this.router.navigate(['/home']);
      },
      error: err => {
        if (err.status === 401) {
          const confirmCreate = this.dialog.open(ConfirmCreateUserDialogComponent,
            {
              panelClass: 'custom-dialog-container'
            }
          );

        confirmCreate.afterClosed().subscribe(result => {
          if(result) {
            this.auth.create(this.email).subscribe({
              next: newUser => {
                console.log(newUser)
                this.saveSession(newUser);
                this.router.navigate(['/home']);
              }
            });
          }
        });
        }
      }
    });
  }

  saveSession(userData: any) {
    localStorage.setItem('userId', userData.user.id);
    localStorage.setItem('token', userData.token);
  }
}
