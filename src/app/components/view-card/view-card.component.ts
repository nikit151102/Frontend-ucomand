import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCardService } from './view-card.service';
import { SettingHeaderService } from '../setting-header.service';
import { TokenService } from '../token.service';
import { DomainService } from '../domain.service';
import { PopUpEntryService } from '../pop-up-entry/pop-up-entry.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ResumeComponent } from './resume/resume.component';
import { VacancyComponent } from './vacancy/vacancy.component';
import { ResumeService } from '../personal-account/services/resume.service';

@Component({
  selector: 'app-view-vacancy',
  standalone: true,
  imports: [CommonModule, VacancyComponent, ResumeComponent, SkeletonModule],
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.css']
})
export class ViewCardComponent implements OnInit {

  imagePath: string = '';
  domainName: string = '';
  visibleCard: boolean = false;
  dataCard: any;
  typeCard: any;
  currentUser: any;

  constructor(
    public viewCardService: ViewCardService,
    private settingHeaderService: SettingHeaderService,
    private router: Router,
    public tokenService: TokenService,
    private domainService: DomainService,
    private popUpEntryService: PopUpEntryService,
    private route: ActivatedRoute,
    private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.typeCard = localStorage.getItem('routeTypeCard');
    this.settingHeaderService.shared = true;
    this.settingHeaderService.backbtn = true;

    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.viewCardService.getCardData(id).subscribe(
        (data) => {
          this.dataCard = data;
          this.visibleCard = true;
          this.domainName = this.domainService.setDomain(this.dataCard.user.freeLink);
          this.domainService.checkImageExists(this.domainName).then((path) => {
            this.imagePath = path;
          });
          this.viewCardService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            console.log("user",user)
          });
        },
        (error) => {
          console.error('Ошибка при загрузке данных:', error);
        }
      );
    });
  }

  viewUser() {
    this.router.navigate([`/user`, this.dataCard.user.id]);
  }

  enter() {
    this.popUpEntryService.showDialog();
  }

  setArchive(event: Event) {
    event.stopPropagation();
      this.resumeService.toggleResumeArchive(this.dataCard);
      this.router.navigate([`/myaccount`, this.dataCard.user.id]);
  }

}
