import { Component } from '@angular/core';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectingApplicationsComponent } from '../collecting-applications/collecting-applications.component';
import { HackathonService } from '../../hackathon.service';

@Component({
  selector: 'app-settings-admin',
  standalone: true,
  imports: [CommonModule, PopupDeleteComponent, CollectingApplicationsComponent],
  templateUrl: './settings-admin.component.html',
  styleUrl: './settings-admin.component.css'
})
export class SettingsAdminComponent {

  constructor(private router: Router, private route: ActivatedRoute, private hackathonService: HackathonService) { }

  getEditData() {
    let paramId = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['editHackathon', paramId]);
  }

  openMenage() {
    this.hackathonService.page = 'manage'
  }

}
