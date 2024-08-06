import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TagsComponent } from './tags/tags.component';
import { SkillsService } from './services/skills.service';
import { CommonModule } from '@angular/common';
import { SpecialtiesService } from './services/specialties.service';
import { ExcelReaderComponent } from './excel-reader/excel-reader.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MenubarModule, TagsComponent, ExcelReaderComponent, FormsModule, InputOtpModule, NotificationsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [MessageService]
})
export class AdminComponent implements OnInit {

  accessCode: string = '';
  isAuthenticated: boolean = false;
  errorMessage: string = '';

  // Предположим, что это правильный код доступа
  private readonly correctCode = '2024';

  submitCode() {
    if (this.accessCode === this.correctCode) {
      this.isAuthenticated = true;
      this.errorMessage = '';
      // Используйте `router.navigate` для навигации после успешной аутентификации
      // Например, переходим на /adminAccount
    } else {
      this.errorMessage = 'Неверный код доступа';
    }
  }
  items: MenuItem[] | undefined;
  TypeSetting: string = 'specialties';

  constructor(public skillsService: SkillsService, public specialtiesService: SpecialtiesService, private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Главная',
      },
      {
        label: 'Специальности',
        command: () => { this.TypeSetting = 'specialties' }
      },
      {
        label: 'Навыки',
        command: () => { this.TypeSetting = 'skills' }
      },
      {
        label: 'Уведомления',
        command: () => { this.TypeSetting = 'notifications' }
      },
    ]
  }
}
