import { Component, ElementRef } from '@angular/core';
import { SettingHeaderService } from './components/setting-header.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { PopUpEntryService } from './components/pop-up-entry/pop-up-entry.service';
import { AvatarSelectionService } from './components/pop-up-avatar/avatar-selection.service';

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
  constructor(public settingHeaderService: SettingHeaderService, public popUpEntryService: PopUpEntryService,
      private avatarSelectionService:AvatarSelectionService,private el: ElementRef) {

  }

ngAfterViewInit(): void {
  const observer = new MutationObserver(() => {
    const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.chapterCard');
    cards.forEach(card => {
      const titleEl = card.querySelector('.chapterCard-title');
      if (titleEl && titleEl.textContent?.trim().includes('Доступность')) {
        card.style.display = 'none';
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

  ngOnInit() {

    const confirmAuth = localStorage.getItem('confirmAuth');
    const savedEmail = localStorage.getItem('authEmail');

    if (confirmAuth === 'true' && savedEmail) {

      // переводим сразу в режим подтверждения кода
      this.popUpEntryService.confirmAuth = true;
      this.popUpEntryService.accessVerification = false;

      // открываем попап
      this.popUpEntryService.showDialog();

    }

    this.popUpEntryService.getUser().subscribe(
      (data) => {
        this.avatarSelectionService.selectAvatar(data.imageLink)
        if (data.banned == false) {
          localStorage.setItem('USaccess', 'we26b502b2fe32e69046810717534b32d');
        } else {
          localStorage.setItem('USaccess', 'b326b5062b2f0e69046810717534cb09');
        }
      })
    this.settingHeaderService.isFilterState$.subscribe(value => {
      this.isVisibleFilter = value;

    });
  }
}
