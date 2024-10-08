import { Component } from '@angular/core';
import { SettingHeaderService } from './components/setting-header.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopUpEntryService } from './components/pop-up-entry/pop-up-entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'uteam';
  isVisibleFilter: boolean = false;
  constructor(public settingHeaderService: SettingHeaderService,public popUpEntryService: PopUpEntryService){

  }
  ngOnInit() {
    this.popUpEntryService.getUser().subscribe(
      (data) => {
        if(data.banned  == false)
          {
            localStorage.setItem('USaccess', 'we26b502b2fe32e69046810717534b32d');
          }else{
            localStorage.setItem('USaccess', 'b326b5062b2f0e69046810717534cb09' );
          }
      })
    this.settingHeaderService.isFilterState$.subscribe(value => {
      this.isVisibleFilter = value;

    });
  }
}
