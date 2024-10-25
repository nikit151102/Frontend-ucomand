import { Component } from '@angular/core';
import { PopUpResponseTeamService } from './pop-up-response-team.service';
import { CommonModule } from '@angular/common';
import { CardPersonalResumeComponent } from '../../../../user-account/card-personal-resume/card-personal-resume.component';

@Component({
  selector: 'app-pop-up-response-team',
  standalone: true,
  imports: [CommonModule, CardPersonalResumeComponent],
  templateUrl: './pop-up-response-team.component.html',
  styleUrl: './pop-up-response-team.component.css'
})
export class PopUpResponseTeamComponent {

vacanciesList = [
  {
    "id": 311,
    "title": "string",
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
      "id": 63,
      "name": "Менеджер продукта",
      "nameEng": "Product Manager",
      "competenceLevel": 3,
      "type": "PROFESSION",
      "color": null
    },
    "skills": [
      {
        "id": 2553,
        "name": "Управление бюджетом",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 132,
        "name": "BI",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 1997,
        "name": "Продуктовая стратегия",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 2582,
        "name": "Управление IT-проектами",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 5420,
        "name": "SQL",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 157,
        "name": "RnD",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 2002,
        "name": "Продуктовый менеджмент",
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
    "details": "Ищу продукт",
    "visibility": "EVERYBODY",
    "creationDate": "2024-10-14T09:25:40.969413Z",
    "banReason": null
  },
  {
    "id": 310,
    "title": "string",
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
      "id": 63,
      "name": "Менеджер продукта",
      "nameEng": "Product Manager",
      "competenceLevel": 3,
      "type": "PROFESSION",
      "color": null
    },
    "skills": [
      {
        "id": 132,
        "name": "BI",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 2553,
        "name": "Управление бюджетом",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 2582,
        "name": "Управление IT-проектами",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 1997,
        "name": "Продуктовая стратегия",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 5420,
        "name": "SQL",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 157,
        "name": "RnD",
        "nameEng": null,
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 2002,
        "name": "Продуктовый менеджмент",
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
    "details": "Ищу продукт",
    "visibility": "EVERYBODY",
    "creationDate": "2024-10-14T09:25:32.647484Z",
    "banReason": null
  },
  {
    "id": 308,
    "title": "string",
    "user": {
      "id": 310,
      "firstName": "Gleb",
      "lastName": "Goviadinskiy",
      "gender": "MALE",
      "age": 33,
      "freeLink": "https://www.figma.com/proto/oz3pcdqxMmyCj0N1vL63HZ?node-id=0-1&t=QixymY657HAyilxm-6",
      "ownLink": "",
      "aboutMe": "UX/UI Дизайнер. Опыт 13 лет. Шарю за 3D и Тильду. Нарисовал дизайн для нового приложения Гриль1",
      "dateOfRegistration": "2024-10-14T07:26:41.506786Z",
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
      "nickname": "gleb124",
      "telegram": "gleb124",
      "email": "gleb124@mail.ru",
      "role": "USER",
      "imageLink": null,
      "banned": false,
      "banReason": null
    },
    "profession": {
      "id": 46,
      "name": "UI/UX дизайнер",
      "nameEng": "UI/UX Designer",
      "competenceLevel": 2,
      "type": "PROFESSION",
      "color": null
    },
    "skills": [
      {
        "id": 824,
        "name": "Анимация",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 553,
        "name": "Adobe Photoshop",
        "nameEng": "",
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 4548,
        "name": "Motion Design",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 321,
        "name": "Tilda",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 552,
        "name": "Figma",
        "nameEng": "",
        "competenceLevel": 3,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 555,
        "name": "Adobe After Effects",
        "nameEng": "",
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 695,
        "name": "3D Animation",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      },
      {
        "id": 3231,
        "name": "Cinema 4D",
        "nameEng": null,
        "competenceLevel": 2,
        "type": "SKILL",
        "color": null
      }
    ],
    "motivations": [
      {
        "id": 2,
        "name": "За оплату",
        "nameEng": null,
        "competenceLevel": null,
        "type": "MOTIVATION",
        "color": "#23b9b0"
      }
    ],
    "minPayment": 0,
    "details": "UX/UI дизайнер. 13 лет опыта. Шарю за 3D и Тильду. Нарисовал новый дизайн приложения Гриль1",
    "visibility": "CREATOR_ONLY",
    "creationDate": "2024-10-14T07:37:03.505118Z",
    "banReason": null
  }
]


  constructor(private popUpResponseTeamService: PopUpResponseTeamService) { }

  submit(): void {
    this.popUpResponseTeamService.hidePopup();  
  }

  cancel(): void {
    this.popUpResponseTeamService.hidePopup();  
  }
  
}
