import { Component, Input, OnInit } from '@angular/core';
import { SettingHeaderService } from '../setting-header.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css'
})
export class PageErrorComponent implements OnInit{

  @Input() content: any = {
    Bgimg: '',
    imageSource: 'assets/error/ups.png',
    subtitle: 'Обратитесь к нашим специалистам технической поддержки по кнопке ниже'
  }

  constructor(private settingHeaderService:SettingHeaderService){}

  ngOnInit(): void {
    this.settingHeaderService.isheader= false;
  }

}
