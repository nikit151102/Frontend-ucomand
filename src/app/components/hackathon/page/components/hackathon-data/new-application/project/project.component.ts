import { Component, Input, OnInit } from '@angular/core';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  @Input() item: any = {
    img: 'https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg',
    name: 'Ютим',
  };
  isSelected: boolean = false;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {}

  onAvatarClick(event: Event, project: string): void {
    if (this.isSelected) {
      this.projectService.selectProject('');
      this.isSelected = false;
    } else {
      this.projectService.selectProject(project);
      this.isSelected = true;
    }
    event.stopPropagation();
  }

}