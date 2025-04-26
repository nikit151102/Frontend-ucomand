import { Component } from '@angular/core';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CollectingApplicationsComponent } from '../collecting-applications/collecting-applications.component';

@Component({
  selector: 'app-settings-admin',
  standalone: true,
  imports: [CommonModule, PopupDeleteComponent, CollectingApplicationsComponent],
  templateUrl: './settings-admin.component.html',
  styleUrl: './settings-admin.component.css'
})
export class SettingsAdminComponent {

  constructor(private router: Router) { }

  getEditData() {
    this.router.navigate(['editHackathon', 'test']);
  }

}
