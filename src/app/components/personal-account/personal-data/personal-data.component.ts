import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule , ReactiveFormsModule],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent {
  ingredient!: string;
}
