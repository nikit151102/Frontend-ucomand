import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent implements OnInit {

  constructor(private popUpService: PopUpService) { }

  title: any;
  item: any;

  ngOnInit(): void {

    this.popUpService.itemCurrent$.subscribe((value: any) => {
      this.item = value;
      console.log('itemitemitem', this.item)
    })

    this.popUpService.titleCurrent$.subscribe((value: any) => {
      this.title = value;
    })
  }

  setApplicationClick() {
    this.popUpService.setApplication();
  }

  setDeclineClick() {
    this.popUpService.setDecline();
  }

  cancel() {
    this.popUpService.setItem(null);
    this.popUpService.hidePopup();
  }

}
