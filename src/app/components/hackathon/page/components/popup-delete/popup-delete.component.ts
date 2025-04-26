import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-delete.component.html',
  styleUrl: './popup-delete.component.css'
})
export class PopupDeleteComponent {

  isPopupOpen = false;
  
  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  token(): string {
    const value = "dcsd";
    return value ? value : '';
}
}
