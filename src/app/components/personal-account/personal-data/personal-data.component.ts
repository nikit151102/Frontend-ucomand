import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent {
  ingredient!: string;
  
  personalDataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalDataForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      portfolio: [''],
      aboutMe: [''],
      email: ['', [Validators.required, Validators.email]],
      telegram: [''],
      domain: [''],
      approval: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.personalDataForm.valid) {
      console.log('Form Submitted', this.personalDataForm.value);
    } else {
      console.log('Form not valid');
    }
  }
  
}
