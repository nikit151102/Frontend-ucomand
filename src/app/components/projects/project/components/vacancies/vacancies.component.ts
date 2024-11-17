import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css'
})
export class VacanciesComponent implements OnInit {

  isTablet = false;
  isMobile = false;

  vacancies: any =[
    {
      "id": 312,
      "title": "Продуктовый аналитик",
      "user": {
        "id": 312,
        "firstName": "Георгий",
        "lastName": "Гончаренко",
        "gender": "MALE",
        "age": 36,
        "freeLink": "https://joy.money/",
        "ownLink": "",
        "aboutMe": "",
        "dateOfRegistration": "2024-10-14T09:20:56.570012Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user312",
        "telegram": "GeorgyGoncharenko",
        "email": "goga507@inbox.ru",
        "role": "USER",
        "imageLink": null,
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 42,
        "name": "Продуктовый аналитик",
        "nameEng": "Product Analyst",
        "competenceLevel": 2,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 378,
          "name": "Анализ данных",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 1204,
          "name": "Исследование целевой аудитории",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 1202,
          "name": "Исследование рынка",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 1238,
          "name": "Конкурентный анализ",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 1996,
          "name": "Продуктовая аналитика",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 3,
          "name": "За долю",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#298cf4"
        }
      ],
      "minPayment": 0,
      "details": "Продуктовый аналитик",
      "visibility": "CREATOR_ONLY",
      "creationDate": "2024-10-14T09:27:19.009617Z",
      "banReason": null
    },
    {
      "id": 64,
      "title": "Требуется backend-разработчик  на C# (backend, ASP .NET Core)",
      "user": {
        "id": 114,
        "firstName": "Дмитрий",
        "lastName": "Корней",
        "gender": "MALE",
        "age": 22,
        "freeLink": "",
        "ownLink": "",
        "aboutMe": "",
        "dateOfRegistration": "2024-09-23T17:18:28.550117Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user114",
        "telegram": "KenroyDytrim",
        "email": "korney1404@gmail.com",
        "role": "USER",
        "imageLink": "image4_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": 2,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 145,
          "name": "C#",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 266,
          "name": ".NET",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 166,
          "name": "DevOps",
          "nameEng": null,
          "competenceLevel": 1,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 536,
          "name": "Postgre",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 539,
          "name": "ASP.NET MVC",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 2,
          "name": "За оплату",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#23b9b0"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        }
      ],
      "minPayment": 45000,
      "details": "Нужен backend-разработчик в команду.",
      "visibility": "CREATOR_ONLY",
      "creationDate": "2024-09-23T17:26:56.650155Z",
      "banReason": null
    },
    {
      "id": 62,
      "title": "Нужен backend-разработчик",
      "user": {
        "id": 4,
        "firstName": "Uteam",
        "lastName": "Команда",
        "gender": "MALE",
        "age": 41,
        "freeLink": "https://t.me/uteam_forum",
        "ownLink": "",
        "aboutMe": "CEO uteam.top",
        "dateOfRegistration": "2024-09-17T02:32:04.509546Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user",
        "telegram": "ds27108",
        "email": "cdss13@gmail.com",
        "role": "USER",
        "imageLink": "image1_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": null,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 177,
          "name": "Java EE",
          "nameEng": null,
          "competenceLevel": null,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        },
        {
          "id": 3,
          "name": "За долю",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#298cf4"
        }
      ],
      "minPayment": 0,
      "details": "Нужен backend-разработчик",
      "visibility": "EVERYBODY",
      "creationDate": "2024-09-23T13:56:33.144187Z",
      "banReason": null
    },
    {
      "id": 64,
      "title": "Требуется backend-разработчик  на C# (backend, ASP .NET Core)",
      "user": {
        "id": 114,
        "firstName": "Дмитрий",
        "lastName": "Корней",
        "gender": "MALE",
        "age": 22,
        "freeLink": "",
        "ownLink": "",
        "aboutMe": "",
        "dateOfRegistration": "2024-09-23T17:18:28.550117Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user114",
        "telegram": "KenroyDytrim",
        "email": "korney1404@gmail.com",
        "role": "USER",
        "imageLink": "image4_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": 2,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 145,
          "name": "C#",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 266,
          "name": ".NET",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 166,
          "name": "DevOps",
          "nameEng": null,
          "competenceLevel": 1,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 536,
          "name": "Postgre",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 539,
          "name": "ASP.NET MVC",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 2,
          "name": "За оплату",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#23b9b0"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        }
      ],
      "minPayment": 45000,
      "details": "Нужен backend-разработчик в команду.",
      "visibility": "CREATOR_ONLY",
      "creationDate": "2024-09-23T17:26:56.650155Z",
      "banReason": null
    },
    {
      "id": 64,
      "title": "Требуется backend-разработчик  на C# (backend, ASP .NET Core)",
      "user": {
        "id": 114,
        "firstName": "Дмитрий",
        "lastName": "Корней",
        "gender": "MALE",
        "age": 22,
        "freeLink": "",
        "ownLink": "",
        "aboutMe": "",
        "dateOfRegistration": "2024-09-23T17:18:28.550117Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user114",
        "telegram": "KenroyDytrim",
        "email": "korney1404@gmail.com",
        "role": "USER",
        "imageLink": "image4_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": 2,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 145,
          "name": "C#",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 266,
          "name": ".NET",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 166,
          "name": "DevOps",
          "nameEng": null,
          "competenceLevel": 1,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 536,
          "name": "Postgre",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 539,
          "name": "ASP.NET MVC",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 2,
          "name": "За оплату",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#23b9b0"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        }
      ],
      "minPayment": 45000,
      "details": "Нужен backend-разработчик в команду.",
      "visibility": "CREATOR_ONLY",
      "creationDate": "2024-09-23T17:26:56.650155Z",
      "banReason": null
    },
    {
      "id": 62,
      "title": "Нужен backend-разработчик",
      "user": {
        "id": 4,
        "firstName": "Uteam",
        "lastName": "Команда",
        "gender": "MALE",
        "age": 41,
        "freeLink": "https://t.me/uteam_forum",
        "ownLink": "",
        "aboutMe": "CEO uteam.top",
        "dateOfRegistration": "2024-09-17T02:32:04.509546Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user",
        "telegram": "ds27108",
        "email": "cdss13@gmail.com",
        "role": "USER",
        "imageLink": "image1_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": null,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 177,
          "name": "Java EE",
          "nameEng": null,
          "competenceLevel": null,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        },
        {
          "id": 3,
          "name": "За долю",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#298cf4"
        }
      ],
      "minPayment": 0,
      "details": "Нужен backend-разработчик",
      "visibility": "EVERYBODY",
      "creationDate": "2024-09-23T13:56:33.144187Z",
      "banReason": null
    },
    {
      "id": 64,
      "title": "Требуется backend-разработчик  на C# (backend, ASP .NET Core)",
      "user": {
        "id": 114,
        "firstName": "Дмитрий",
        "lastName": "Корней",
        "gender": "MALE",
        "age": 22,
        "freeLink": "",
        "ownLink": "",
        "aboutMe": "",
        "dateOfRegistration": "2024-09-23T17:18:28.550117Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user114",
        "telegram": "KenroyDytrim",
        "email": "korney1404@gmail.com",
        "role": "USER",
        "imageLink": "image4_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": 2,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 145,
          "name": "C#",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 266,
          "name": ".NET",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 166,
          "name": "DevOps",
          "nameEng": null,
          "competenceLevel": 1,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 536,
          "name": "Postgre",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        },
        {
          "id": 539,
          "name": "ASP.NET MVC",
          "nameEng": null,
          "competenceLevel": 2,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 2,
          "name": "За оплату",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#23b9b0"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        }
      ],
      "minPayment": 45000,
      "details": "Нужен backend-разработчик в команду.",
      "visibility": "CREATOR_ONLY",
      "creationDate": "2024-09-23T17:26:56.650155Z",
      "banReason": null
    },
    {
      "id": 62,
      "title": "Нужен backend-разработчик",
      "user": {
        "id": 4,
        "firstName": "Uteam",
        "lastName": "Команда",
        "gender": "MALE",
        "age": 41,
        "freeLink": "https://t.me/uteam_forum",
        "ownLink": "",
        "aboutMe": "CEO uteam.top",
        "dateOfRegistration": "2024-09-17T02:32:04.509546Z",
        "cityOfResidence": {
          "id": 3,
          "name": "Барнаул",
          "region": {
            "id": 4,
            "name": "Алтайский край",
            "district": {
              "id": 6,
              "name": "Сибирский федеральный округ"
            }
          }
        },
        "nickname": "user",
        "telegram": "ds27108",
        "email": "cdss13@gmail.com",
        "role": "USER",
        "imageLink": "image1_male",
        "banned": false,
        "banReason": null
      },
      "profession": {
        "id": 6,
        "name": "Бэкенд разработчик",
        "nameEng": "Backend Developer",
        "competenceLevel": null,
        "type": "PROFESSION",
        "color": null
      },
      "skills": [
        {
          "id": 177,
          "name": "Java EE",
          "nameEng": null,
          "competenceLevel": null,
          "type": "SKILL",
          "color": null
        }
      ],
      "motivations": [
        {
          "id": 1,
          "name": "Без оплаты",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#ffab00"
        },
        {
          "id": 4,
          "name": "Нужна практика",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#cf87f1"
        },
        {
          "id": 3,
          "name": "За долю",
          "nameEng": null,
          "competenceLevel": null,
          "type": "MOTIVATION",
          "color": "#298cf4"
        }
      ],
      "minPayment": 0,
      "details": "Нужен backend-разработчик",
      "visibility": "EVERYBODY",
      "creationDate": "2024-09-23T13:56:33.144187Z",
      "banReason": null
    },
  ];

  constructor(private router: Router){

  }
  
  ngOnInit() {
    this.updateView(window.innerWidth);
    console.log("vacanc", )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateView(event.target.innerWidth);
  }

  updateView(width: number): void {
    if (width >= 768) {
      this.isTablet = true;
      this.isMobile = false;
    } else {
      this.isTablet = false;
      this.isMobile = true;
    }
  }

  getCardUrl(cardValue: any, type: string, route: string): string {
    localStorage.setItem('routeTypeCard', type);
    return this.router.createUrlTree([route, cardValue]).toString();
  }

  onCardClick(event: MouseEvent, cardId: any, type: string): void {
    if (event.button === 1 || event.ctrlKey || event.metaKey) {
      return;
    }
    event.preventDefault();
    this.router.navigate([`/${type}`, cardId]);
  }

}
