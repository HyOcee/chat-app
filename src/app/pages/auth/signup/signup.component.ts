import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notify: ToastrService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe(
      (res) => {
        this.notify.success(
          'Welcome!! You have been successfully registered as a user. Please Sign in and enjoy yourself',
          '',
          {
            closeButton: true,
            progressBar: true,
          }
        );
      },
      (err) => {
        this.notify.error(
          '',
          'Error signing you up. Please verify your details and try again',
          {
            closeButton: true,
            progressBar: true,
          }
        );
      }
    );
  }
}
