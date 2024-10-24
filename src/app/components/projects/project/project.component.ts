import { Component } from '@angular/core';
import { ToolsComponent } from './components/tools/tools.component';
import { TeamComponent } from './components/team/team.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ToolsComponent,TeamComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

}
