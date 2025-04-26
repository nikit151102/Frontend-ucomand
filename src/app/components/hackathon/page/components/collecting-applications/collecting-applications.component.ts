import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-collecting-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collecting-applications.component.html',
  styleUrl: './collecting-applications.component.css'
})
export class CollectingApplicationsComponent {

  isPopupOpen = false;
  isStopCollecting: boolean = false;
  btnText: string = 'остановить';
  
  openPopup() {
    this.isPopupOpen = true;
    if(this.isStopCollecting){
      this.btnText = 'возобновить';
    }else{
      this.btnText = 'остановить';
    }
  }

  closePopup() {
    this.isPopupOpen = false;
  }


  stopping(){
    this.isPopupOpen = false;
    this.isStopCollecting = true;
    this.btnText = 'возобновить';
  }

  resume(){
    this.isPopupOpen = false;
    this.isStopCollecting = false;
    this.btnText = 'остановить';
  }
}
