import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeComponent } from './resume/resume.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../token.service';
import { DomainService } from '../domain.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, VacancyComponent, ResumeComponent, SkeletonModule],
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.css'
})
export class ViewCardComponent implements OnInit {

  constructor(public viewCardService: ViewCardService,
    private settingHeaderService: SettingHeaderService,
    private router: Router,
    public tokenService: TokenService,
    private domainService: DomainService,
    private popUpEntryService: PopUpEntryService,
    private route: ActivatedRoute) {
  }

  imagePath: string = '';
  domainName: string = '';
  visibleCard: boolean = false;
  dataCard: any;
  typeCard: any;
  
  ngOnInit(): void {
    this.typeCard = localStorage.getItem('routeTypeCard');
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;
    const urlString = this.viewCardService.selectedUser.url;
    this.domainName = this.domainService.setDomain(urlString);
    console.log("property", this.domainName)
    this.domainService.checkImageExists(this.domainName).then((path) => {
      this.imagePath = path;
    });

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!; // Преобразование параметра в число
      // Используем id и currentPath для вызова сервиса
      this.viewCardService.getCardData(id).subscribe(
        (data) => {
          this.dataCard = data;
          this.visibleCard = true;
          console.log('Data:', data);
        },
        (error) => {
          console.error('Ошибка при загрузке данных:', error);
        }
      );
    });


  }

  cardItem: any;

  viewUser() {
    this.router.navigate([`/user`, 'root']);
  }

  enter() {
    this.popUpEntryService.showDialog();
  }


}
