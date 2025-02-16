import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../project.service';
import { CommonModule } from '@angular/common';
import { NewPeopleService } from './new-people.service';
import { ItemNewPeopleComponent } from './item-new-people/item-new-people.component';

@Component({
  selector: 'app-new-people',
  standalone: true,
  imports: [CommonModule,ItemNewPeopleComponent],
  templateUrl: './new-people.component.html',
  styleUrl: './new-people.component.css'
})
export class NewPeopleComponent implements OnInit {

  cardItems: any;
  constructor(public projectService: ProjectService,
    private newPeopleService: NewPeopleService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let projectData = this.projectService.getCurrentProjectData();
    this.newPeopleService.getNewPeopleService(projectData.id).subscribe((data: any) => {
      this.cardItems = data.data;
      console.log('getNewPeopleService', data)
    })


  }


}