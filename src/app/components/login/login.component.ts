import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   email = '';
   constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.email).subscribe({
      next: user => {
         this.saveSession(user);
        this.router.navigate(['/home']);
      },
      error: err => {
        if (err.status === 404) {
          const confirmCreate = confirm('Usuario no encontrado. ¿Crear cuenta?');
          if (confirmCreate) {
            this.auth.create(this.email).subscribe({
              next: newUser => {
                 this.saveSession(newUser);
                this.router.navigate(['/home']);
              }
            });
          }
        }
      }
    });
  }

  saveSession(userData: any) {
    localStorage.setItem('userId', userData.user.id);
    localStorage.setItem('token', userData.token);
  }
}
