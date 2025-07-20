import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { PopUpChangePasswordService } from './pop-up-change-password.service';

@Component({
  selector: 'app-pop-up-change-password',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up-change-password.component.html',
  styleUrl: './pop-up-change-password.component.css'
})
export class PopUpChangePasswordComponent {
  authForm: FormGroup;
  isError: boolean = false;

  constructor(
    public popUpChangePasswordService: PopUpChangePasswordService,
    private router: Router,
    public tokenService: TokenService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  cancel(): void {
    this.popUpChangePasswordService.hidePopup();
  }

  changePassword() {
    this.isError = true;

    if (this.authForm.invalid) {
      return;
    }

    const { currentPassword, newPassword } = this.authForm.value;

    this.popUpChangePasswordService.changePassword(currentPassword, newPassword).subscribe(
      response => {
        this.popUpChangePasswordService.hidePopup();
        this.tokenService.clearToken();
        localStorage.removeItem('Linkken');
        this.router.navigate(['/']);
      },
      error => {
        console.error('Ошибка при изменении пароля:', error);
      }
    );
  }
}