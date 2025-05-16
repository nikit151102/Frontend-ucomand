import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ScreensaverHackComponent } from './components/screensaver/screensaver.component';
import { HackathonDataComponent } from './components/hackathon-data/hackathon-data.component';
import { CommandsHackComponent } from './components/commands/commands.component';
import { PartyComponent } from './components/party/party.component';
import { SettingsAdminComponent } from './components/settings-admin/settings-admin.component';
import { HackathonService } from './hackathon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  imports: [CommonModule, ScreensaverHackComponent, HackathonDataComponent, CommandsHackComponent, PartyComponent, SettingsAdminComponent],
  templateUrl: './hackathon.component.html',
  styleUrl: './hackathon.component.css'
})
export class HackathonComponent implements OnInit{

  paramId: any;
  projectData: any;
  isOwner: any;

  constructor(private hackathonService:HackathonService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.paramId = this.route.snapshot.paramMap.get('id');
    console.log('paramId', this.paramId);

    this.hackathonService.currentProjectIsOwner$.subscribe((value: boolean) => {
      this.isOwner = value;
    });

    if (this.paramId) {
      this.hackathonService.getCurrentHackathon(this.paramId).subscribe((dataProject: any) => {
        this.hackathonService.setCurrentProjectData(dataProject);
        this.projectData = dataProject;
      });
    }

  }

}
