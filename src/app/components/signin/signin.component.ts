import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { signIn } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signin: signIn = {
    email: "",
    password: ""
  };
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.buildForm();
    const rememberedUser = this.cookieService.get('rememberedUser');
    if (rememberedUser) {
      // Si existe, llena los campos de correo electrónico y contraseña
      const { email, password } = JSON.parse(rememberedUser);
      this.signInForm.patchValue({ email, password });
      // Marca el checkbox "Remember me"
      const rememberMe = document.getElementById('remember') as HTMLInputElement;
      rememberMe.checked = true;
    }
  }

  buildForm() {
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {
    if (this.signInForm.invalid) {
      console.log("Datos invalidos");
      return;
    }

    this.signin.email = this.f['email'].value;
    this.signin.password = this.f['password'].value;

    this.authService.signIn(this.signin).subscribe((res) => {
      console.log({ res });
      window.localStorage.setItem('token', res.token);
      window.localStorage.setItem('user', res.id);
      // Verifica si el checkbox "Remember me" está marcado
      const rememberMe = document.getElementById('remember') as HTMLInputElement;
      if (rememberMe.checked) {
        // Si está marcado, guarda la información del usuario en una cookie
        this.cookieService.set('rememberedUser', JSON.stringify(this.signInForm.value), 365);
      } else {
        // Si no está marcado, borra la cookie si existe
        this.cookieService.delete('rememberedUser');
      }
      this.router.navigate(['/private'])
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.signInForm.controls;
  }
}
