import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeProjectComponent } from './type-project/type-project.component';
import { CommonModule } from '@angular/common';
import { CreateEditProjectsService } from '../create-edit-projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TypeProjectComponent],
  templateUrl: './create-edit-projects.component.html',
  styleUrl: './create-edit-projects.component.css'
})
export class CreateEditProjectsComponent implements OnInit {

  form!: FormGroup;
  submitAttempted = false;

  constructor(private fb: FormBuilder, private router: Router, private createEditProjectsService: CreateEditProjectsService) {

  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      nameProject: ['', [Validators.required, Validators.maxLength(200)]],
      miniDescription: ['', [Validators.required, Validators.maxLength(300)]],
      typeProject: [, Validators.required],
      email: ['', Validators.required],
      telegram: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1500)]],
      stageDevelopment: ['', [Validators.required, Validators.maxLength(1500)]],
      tasks: ['', [Validators.required, Validators.maxLength(1500)]]
    });
  }

  onTagsChanged(tags: any, field: string): void {
    this.form.get(field)?.setValue(tags);
  }

  submitForm(): void {
    this.submitAttempted = true;

    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
    });

    if (this.form.valid) {
      console.log('Форма отправлена:', this.form.value);
      
      let data = this.form.value
      let newData = {
        'nameProject': data.nameProject,
        'miniDescription': data.miniDescription,
        'typeProject':  data.typeProject,
        'email': data.email,
        'telegram': data.telegram,
        'description': data.description.replace(/\r?\n/g, '\n'),
        'stageDevelopment': data.stageDevelopment.replace(/\r?\n/g, '\n'),
        'tasks':data.tasks.replace(/\r?\n/g, '\n')
      };
      
      this.createEditProjectsService.setFormData(newData);

      this.router.navigate(['project', 123]);
    } else {
      console.log('Форма содержит ошибки:', this.form.errors);
    }
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!control?.hasError(error) && (control?.dirty || control?.touched || this.submitAttempted);
  }

}
