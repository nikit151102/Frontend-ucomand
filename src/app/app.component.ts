import { Component } from '@angular/core';
import { SettingHeaderService } from './components/setting-header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'uteam';

  constructor(public settingHeaderService: SettingHeaderService){

  }
  
}
