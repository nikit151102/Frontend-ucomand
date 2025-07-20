import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { PopUpChangePasswordService } from './pop-up-change-password.service';

@Component({
  selector: 'app-pop-up-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
    // Проверяем валидность формы
    if (this.authForm.invalid) {
      this.isError = true;
      this.authForm.markAllAsTouched();
      console.error('Форма невалидна', this.authForm.errors);
      return;
    }

    // Проверяем совпадение паролей
    if (this.authForm.hasError('passwordMismatch')) {
      console.error('Пароли не совпадают');
      return;
    }

    const { currentPassword, newPassword } = this.authForm.value;
    console.log('Form values:', { currentPassword, newPassword });

    this.popUpChangePasswordService.changePassword(currentPassword, newPassword).subscribe(
      (response) => {  // Упрощенный синтаксис без next:
        this.popUpChangePasswordService.hidePopup();
        this.tokenService.clearToken();
        localStorage.removeItem('Linkken');
        this.router.navigate(['/']);
      },
      (error) => {  // Обработка ошибки
        this.isError = true;
        console.error('Ошибка при изменении пароля:', error);
      }
    );
  }
}