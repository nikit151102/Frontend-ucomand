import { Component, Input, OnInit } from '@angular/core';
import { AvatarSelectionService } from '../avatar-selection.service';

@Component({
  selector: 'app-item-avatar',
  standalone: true,
  imports: [],
  templateUrl: './item-avatar.component.html',
  styleUrl: './item-avatar.component.css'
})
export class ItemAvatarComponent implements OnInit{
  @Input() avatarSrc: string = '';
  isSelected: boolean = false;

  constructor(private avatarSelectionService: AvatarSelectionService) { }

  ngOnInit(): void {

    this.avatarSelectionService.selectedAvatar$.subscribe(selectedAvatar => {
      this.isSelected = selectedAvatar === this.avatarSrc;
    });
  }

  onAvatarClick(event: Event, avatar: string): void {
    if(this.isSelected){
      this.avatarSelectionService.selectAvatar('');
    }else{
      this.avatarSelectionService.selectAvatar(avatar);
    }
    event.stopPropagation();
  }

}
