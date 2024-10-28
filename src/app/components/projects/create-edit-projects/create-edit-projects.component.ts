import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-projects',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-edit-projects.component.html',
  styleUrl: './create-edit-projects.component.css'
})
export class CreateEditProjectsComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      nameProject: ['', [Validators.maxLength(100)]],
      miniDescription: ['', [Validators.required, Validators.maxLength(300)]],
      typeProject: ['', Validators.required],
      email: ['', Validators.required],
      telegram: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(700)]],
      stageDevelopment: ['', Validators.required],
      tasks: ['', Validators.required]
    });
  }


}
