import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmUser = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  loginError = false;

  constructor(
    private snackBarRef: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    if (localStorage.getItem('API_KEY')) {
      this.router.navigate(['/main-page']);
    }
  }

  ngOnInit(): void {}

  submit() {
    const { username, password } = this.frmUser.value;
    this.authService.login(username, password).subscribe(
      (res) => {
        localStorage.setItem('API_KEY', res.apiKey);
        this.router.navigate(['/main-page']);
      },
      (err) => {
        this.loginError = true;
        this.snackBarRef.open('Login error', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
