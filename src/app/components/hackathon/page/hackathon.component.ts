import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreensaverHackComponent } from './components/screensaver/screensaver.component';
import { HackathonDataComponent } from './components/hackathon-data/hackathon-data.component';
import { CommandsHackComponent } from './components/commands/commands.component';
import { PartyComponent } from './components/party/party.component';
import { SettingsAdminComponent } from './components/settings-admin/settings-admin.component';

@Component({
  selector: 'app-hackathon',
  standalone: true,
  imports: [CommonModule, ScreensaverHackComponent, HackathonDataComponent, CommandsHackComponent, PartyComponent, SettingsAdminComponent],
  templateUrl: './hackathon.component.html',
  styleUrl: './hackathon.component.css'
})
export class HackathonComponent {

}
