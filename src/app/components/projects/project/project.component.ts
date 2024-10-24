import { Component } from '@angular/core';
import { ToolsComponent } from './components/tools/tools.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ToolsComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {

}
