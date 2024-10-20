import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthService } from '../../services/auth.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    NzFormModule, 
    NzInputModule, 
    NzButtonModule, 
    NzCheckboxModule,
    NzIconModule,
    NzFlexModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    })
  }

  onClickLogin():void {
    if(this.form.invalid) return;
    this.authService.login(this.form.value)
      .then(() => {
        this.router.navigate(["/products"]);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onClickLoginWithGoogle():void {
    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(["/products"]);
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
