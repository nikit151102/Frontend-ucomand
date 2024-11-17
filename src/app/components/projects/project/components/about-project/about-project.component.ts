import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-about-project',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.css'
})
export class AboutProjectComponent implements OnInit {

  @Input() detailsList: any;
  data:any;
  constructor(public projectService: ProjectService) {

  }

  ngOnInit(): void {
this.data = [
  {
    title: 'Описание',
    context: this.detailsList.description
  },
  {
    title: 'Этап развития',
    context: this.detailsList.stageDevelopment
  },
  {
    title: 'Задачи',
    context: this.detailsList.tasks
  },
]

console.log("data", this.data)
  }

}
