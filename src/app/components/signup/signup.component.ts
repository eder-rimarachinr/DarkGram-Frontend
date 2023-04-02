import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signUp } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signup: signUp = {
    username: "",
    email: "",
    password: ""
  };
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      console.log("Datos invalidos");
      return;
    }

    this.signup.username = this.f['username'].value;
    this.signup.email = this.f['email'].value;
    this.signup.password = this.f['password'].value;

    this.authService.signUp(this.signup).subscribe((res) => {
      console.log({ res });
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('user', res.id);
      this.router.navigate(['/private'])
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

}
