import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor() { }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  
}
