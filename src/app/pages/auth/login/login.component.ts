import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', JSON.stringify(res.accessToken));
        this.notify.success('Login Successful', '', {
          closeButton: true,
          progressBar: true,
        });
        this.router.navigateByUrl('/')
      },
      (err) => {
        this.notify.error(
          '',
          'Error signing in. Please verify your details and try again',
          {
            closeButton: true,
            progressBar: true,
          }
        );
      }
    );
  }
}
