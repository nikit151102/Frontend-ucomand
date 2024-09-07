import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpAvatarService } from './pop-up-avatar.service';
import { ItemAvatarComponent } from './item-avatar/item-avatar.component';

@Component({
  selector: 'app-pop-up-avatar',
  standalone: true,
  imports: [ItemAvatarComponent],
  templateUrl: './pop-up-avatar.component.html',
  styleUrl: './pop-up-avatar.component.css'
})
export class PopUpAvatarComponent {

  constructor(private popUpAvatarService:PopUpAvatarService, private router: Router){}

  cancel(): void {
    this.popUpAvatarService.hidePopup();  
  }

avatarImgs= [
  
]
}
