import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
export class VacancyLibraryComponent {
    router;
    constructor(router) {
        this.router = router;
    }
    cardItem;
    getSkillsColor(item) {
        switch (item) {
            case 1:
                return '#50B229';
            case 2:
                return '#FAD305';
            case 3:
                return '#EE5354';
            default:
                return '';
        }
    }
    getSkills(item) {
        switch (item) {
            case 1:
                return 'Junior';
            case 2:
                return 'Middle';
            case 3:
                return 'Senior';
            default:
                return '';
        }
    }
    getMotivationColor(item) {
        switch (item) {
            case 'Без оплаты':
                return '#FFAB00';
            case 'Нужна практика':
                return '#CF87F1';
            case 'За долю':
                return '#298CF4';
            case 'За оплату':
                return '#23B9B0';
            default:
                return '';
        }
    }
    viewUser(event, id) {
        event.stopPropagation();
        event.preventDefault();
        this.router.navigate([``, id]);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VacancyLibraryComponent, deps: [{ token: i1.Router }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.13", type: VacancyLibraryComponent, isStandalone: true, selector: "lib-vacancy", inputs: { cardItem: "cardItem" }, ngImport: i0, template: "<div class=\"card\">\r\n    <p class=\"title\">\r\n        {{cardItem.title}}\r\n       \r\n    </p>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0;\">\r\n            \u0418\u0449\u0443:\r\n        </p>\r\n        <div class=\"lookingCard\">\r\n            <p class=\"chapterCard-value text13Caps\" style=\"margin-top: 0.5rem; width: 90%; margin-bottom: 5px;\">\r\n                {{ cardItem?.profession?.name | uppercase }}\r\n            </p>\r\n            <p [ngStyle]=\"{ 'border-color': getSkillsColor(cardItem.profession.competenceLevel) }\" class=\"lookingCard-level\" *ngIf=\"cardItem?.profession?.competenceLevel\">\r\n                {{ getSkills(cardItem.profession?.competenceLevel)  }}\r\n              </p>\r\n        </div>\r\n        <div class=\"lookingCard\">\r\n            <p class=\"chapterCard-value-eng\" >\r\n                {{ cardItem?.profession?.nameEng | uppercase }}\r\n            </p>\r\n        </div>\r\n        \r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u0420\u0430\u0431\u043E\u0442\u0430:\r\n        </p>\r\n        <div class=\"tags\">\r\n            <!-- <ng-container *ngFor=\"let item of cardItem.skills\"> -->\r\n                <div class=\"work\" >\r\n                    <p class=\"workText\">\r\n                        \u0424\u0440\u0438\u043B\u0430\u043D\u0441/\u041F\u0440\u043E\u0435\u043A\u0442\r\n                    </p>\r\n                </div>\r\n                <div class=\"work\" >\r\n                    <p class=\"workText\">\r\n                        \u0424\u0440\u0438\u043B\u0430\u043D\u0441/\u041F\u0440\u043E\u0435\u043A\u0442\r\n                    </p>\r\n                </div>\r\n            <!-- </ng-container> -->\r\n        </div>\r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u041D\u0430\u0432\u044B\u043A\u0438:\r\n        </p>\r\n        <div class=\"tags\">\r\n            <ng-container *ngFor=\"let item of cardItem.skills\">\r\n                <div class=\"tag\">\r\n                    {{item.name}}\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u041C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u044F:\r\n        </p>\r\n        <div class=\"motivations\">\r\n            <ng-container *ngFor=\"let item of cardItem.motivations\">\r\n                <div class=\"motivation\" [ngStyle]=\"{ 'background': getMotivationColor(item.name) }\">\r\n                    {{ item.name }}\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n    </div>\r\n    <div class=\"profile\">\r\n        <div class=\"leftProfileChapter\" (click)=\"viewUser($event, cardItem?.user?.nickname)\">\r\n            <div class=\"logo\">\r\n                <ng-container *ngIf=\"cardItem?.user?.imageLink\">\r\n                    <img [src]=\"'assets/avatars/'+ cardItem?.user?.imageLink + '.png'\" alt=\"avatar\">\r\n                  </ng-container>\r\n                  <ng-container *ngIf=\"!cardItem?.user?.imageLink\">\r\n                    <img [src]=\"'assets/avatars/default.png'\" alt=\"avatar\">\r\n                  </ng-container>\r\n            </div>\r\n            <div style=\"display: flex; flex-wrap: wrap; flex-direction: column; justify-content: flex-end; margin-bottom: 2px;\">\r\n                <p class=\"fullName\" style=\"margin: 0;\">\r\n                    {{cardItem?.user?.lastName}}\r\n                </p>\r\n                <p class=\"fullName\" style=\"margin: 0;\">\r\n                    {{cardItem?.user?.firstName}}\r\n                </p>\r\n            </div>\r\n           \r\n        </div>\r\n        <div class=\"rightProfileChapter\">\r\n            <p class=\"dateVacancy dateTitle\">\r\n                \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043E\r\n            </p>\r\n            <p class=\"dateVacancy dateValue\">\r\n                {{cardItem.creationDate | date: 'dd.MM.yyyy' }}\r\n            </p>\r\n        </div>\r\n        \r\n    </div>\r\n</div>", styles: [".card{display:flex;flex-direction:column;border-radius:1.3rem;padding:12px;width:100%;box-shadow:1px 2px 4px #2828281a;background:var(--background-card);margin-bottom:1rem;break-inside:avoid;transition:transform .3s ease-in-out}.card:hover{-webkit-box-shadow:4px 4px 20px -11px rgba(40,40,40,.35);-moz-box-shadow:4px 4px 20px -11px rgba(40,40,40,.35);box-shadow:4px 4px 20px -11px #28282859;transform:scale(1.012)}.title{font-family:var(--font-Monts);font-weight:600;font-size:var(--subtitle1);line-height:114%;color:var(--font-color);margin-top:5px}.chapterCard-title{font-family:var(--font-Monts);font-weight:500;font-size:var(--text12);line-height:117%;color:var(--font-color)}.chapterCard-value-eng{margin:0;width:90%;font-family:var(--font-Monts);font-weight:500;font-size:.7rem;line-height:117%;text-transform:uppercase;color:var(--font-profession-eng)}.work{border-radius:20px;padding:8px 10px;background:#f3f3f3}.workText{font-family:var(--font-Monts);font-weight:400;font-size:.7rem;line-height:120%;color:var(--font-color);margin:0}.lookingCard{display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between}.lookingCard-level{margin:0;border:2px solid #fad305;padding:4px 6px;border-radius:5px;font-family:var(--font-Monts);font-weight:700;font-size:12px;line-height:100%;color:var(--font-color)}.tags{display:flex;flex-wrap:wrap;gap:.3rem}.tag{display:flex;align-items:center;border:1px solid #806bff;border-radius:10px;padding:4px 8px;background:var(--tag-background);height:31px;font-family:var(--font-Monts);font-weight:300;font-size:.7rem;line-height:120%;color:var(--font-color)}.motivations{display:flex;flex-wrap:wrap;gap:.3rem}.motivation{border-radius:50px;padding:8px 10px;font-family:var(--font-Monts);font-weight:400;font-size:.7rem;line-height:120%;color:#fff}.profile{display:flex;flex-direction:row;justify-content:space-between;margin-top:1rem;align-items:flex-end}.leftProfileChapter{display:flex;flex-direction:row;gap:1rem}.rightProfileChapter{display:flex;flex-direction:column}.fullName{font-family:var(--font-Monts);font-weight:500;font-size:var(--text13);line-height:117%;color:var(--font-color)}.dateVacancy{font-family:var(--font-Monts);line-height:120%;color:var(--font-color)}.dateTitle{margin:0;font-weight:400;font-size:var(--text12)}.dateValue{white-space:nowrap;margin:5px 0 0;font-weight:400;font-size:var(--text12)}.logo img{border-radius:30px;width:52px;height:52px}@media (max-width: 1199.98px){.card:hover{background:var(--background-card)}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "pipe", type: i2.UpperCasePipe, name: "uppercase" }, { kind: "pipe", type: i2.DatePipe, name: "date" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.13", ngImport: i0, type: VacancyLibraryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-vacancy', standalone: true, imports: [CommonModule], template: "<div class=\"card\">\r\n    <p class=\"title\">\r\n        {{cardItem.title}}\r\n       \r\n    </p>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0;\">\r\n            \u0418\u0449\u0443:\r\n        </p>\r\n        <div class=\"lookingCard\">\r\n            <p class=\"chapterCard-value text13Caps\" style=\"margin-top: 0.5rem; width: 90%; margin-bottom: 5px;\">\r\n                {{ cardItem?.profession?.name | uppercase }}\r\n            </p>\r\n            <p [ngStyle]=\"{ 'border-color': getSkillsColor(cardItem.profession.competenceLevel) }\" class=\"lookingCard-level\" *ngIf=\"cardItem?.profession?.competenceLevel\">\r\n                {{ getSkills(cardItem.profession?.competenceLevel)  }}\r\n              </p>\r\n        </div>\r\n        <div class=\"lookingCard\">\r\n            <p class=\"chapterCard-value-eng\" >\r\n                {{ cardItem?.profession?.nameEng | uppercase }}\r\n            </p>\r\n        </div>\r\n        \r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u0420\u0430\u0431\u043E\u0442\u0430:\r\n        </p>\r\n        <div class=\"tags\">\r\n            <!-- <ng-container *ngFor=\"let item of cardItem.skills\"> -->\r\n                <div class=\"work\" >\r\n                    <p class=\"workText\">\r\n                        \u0424\u0440\u0438\u043B\u0430\u043D\u0441/\u041F\u0440\u043E\u0435\u043A\u0442\r\n                    </p>\r\n                </div>\r\n                <div class=\"work\" >\r\n                    <p class=\"workText\">\r\n                        \u0424\u0440\u0438\u043B\u0430\u043D\u0441/\u041F\u0440\u043E\u0435\u043A\u0442\r\n                    </p>\r\n                </div>\r\n            <!-- </ng-container> -->\r\n        </div>\r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u041D\u0430\u0432\u044B\u043A\u0438:\r\n        </p>\r\n        <div class=\"tags\">\r\n            <ng-container *ngFor=\"let item of cardItem.skills\">\r\n                <div class=\"tag\">\r\n                    {{item.name}}\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n    </div>\r\n    <div class=\"chapterCard\">\r\n        <p class=\"chapterCard-title\" style=\"margin-bottom: 0.5rem;\">\r\n            \u041C\u043E\u0442\u0438\u0432\u0430\u0446\u0438\u044F:\r\n        </p>\r\n        <div class=\"motivations\">\r\n            <ng-container *ngFor=\"let item of cardItem.motivations\">\r\n                <div class=\"motivation\" [ngStyle]=\"{ 'background': getMotivationColor(item.name) }\">\r\n                    {{ item.name }}\r\n                </div>\r\n            </ng-container>\r\n        </div>\r\n    </div>\r\n    <div class=\"profile\">\r\n        <div class=\"leftProfileChapter\" (click)=\"viewUser($event, cardItem?.user?.nickname)\">\r\n            <div class=\"logo\">\r\n                <ng-container *ngIf=\"cardItem?.user?.imageLink\">\r\n                    <img [src]=\"'assets/avatars/'+ cardItem?.user?.imageLink + '.png'\" alt=\"avatar\">\r\n                  </ng-container>\r\n                  <ng-container *ngIf=\"!cardItem?.user?.imageLink\">\r\n                    <img [src]=\"'assets/avatars/default.png'\" alt=\"avatar\">\r\n                  </ng-container>\r\n            </div>\r\n            <div style=\"display: flex; flex-wrap: wrap; flex-direction: column; justify-content: flex-end; margin-bottom: 2px;\">\r\n                <p class=\"fullName\" style=\"margin: 0;\">\r\n                    {{cardItem?.user?.lastName}}\r\n                </p>\r\n                <p class=\"fullName\" style=\"margin: 0;\">\r\n                    {{cardItem?.user?.firstName}}\r\n                </p>\r\n            </div>\r\n           \r\n        </div>\r\n        <div class=\"rightProfileChapter\">\r\n            <p class=\"dateVacancy dateTitle\">\r\n                \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043E\r\n            </p>\r\n            <p class=\"dateVacancy dateValue\">\r\n                {{cardItem.creationDate | date: 'dd.MM.yyyy' }}\r\n            </p>\r\n        </div>\r\n        \r\n    </div>\r\n</div>", styles: [".card{display:flex;flex-direction:column;border-radius:1.3rem;padding:12px;width:100%;box-shadow:1px 2px 4px #2828281a;background:var(--background-card);margin-bottom:1rem;break-inside:avoid;transition:transform .3s ease-in-out}.card:hover{-webkit-box-shadow:4px 4px 20px -11px rgba(40,40,40,.35);-moz-box-shadow:4px 4px 20px -11px rgba(40,40,40,.35);box-shadow:4px 4px 20px -11px #28282859;transform:scale(1.012)}.title{font-family:var(--font-Monts);font-weight:600;font-size:var(--subtitle1);line-height:114%;color:var(--font-color);margin-top:5px}.chapterCard-title{font-family:var(--font-Monts);font-weight:500;font-size:var(--text12);line-height:117%;color:var(--font-color)}.chapterCard-value-eng{margin:0;width:90%;font-family:var(--font-Monts);font-weight:500;font-size:.7rem;line-height:117%;text-transform:uppercase;color:var(--font-profession-eng)}.work{border-radius:20px;padding:8px 10px;background:#f3f3f3}.workText{font-family:var(--font-Monts);font-weight:400;font-size:.7rem;line-height:120%;color:var(--font-color);margin:0}.lookingCard{display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between}.lookingCard-level{margin:0;border:2px solid #fad305;padding:4px 6px;border-radius:5px;font-family:var(--font-Monts);font-weight:700;font-size:12px;line-height:100%;color:var(--font-color)}.tags{display:flex;flex-wrap:wrap;gap:.3rem}.tag{display:flex;align-items:center;border:1px solid #806bff;border-radius:10px;padding:4px 8px;background:var(--tag-background);height:31px;font-family:var(--font-Monts);font-weight:300;font-size:.7rem;line-height:120%;color:var(--font-color)}.motivations{display:flex;flex-wrap:wrap;gap:.3rem}.motivation{border-radius:50px;padding:8px 10px;font-family:var(--font-Monts);font-weight:400;font-size:.7rem;line-height:120%;color:#fff}.profile{display:flex;flex-direction:row;justify-content:space-between;margin-top:1rem;align-items:flex-end}.leftProfileChapter{display:flex;flex-direction:row;gap:1rem}.rightProfileChapter{display:flex;flex-direction:column}.fullName{font-family:var(--font-Monts);font-weight:500;font-size:var(--text13);line-height:117%;color:var(--font-color)}.dateVacancy{font-family:var(--font-Monts);line-height:120%;color:var(--font-color)}.dateTitle{margin:0;font-weight:400;font-size:var(--text12)}.dateValue{white-space:nowrap;margin:5px 0 0;font-weight:400;font-size:var(--text12)}.logo img{border-radius:30px;width:52px;height:52px}@media (max-width: 1199.98px){.card:hover{background:var(--background-card)}}\n"] }]
        }], ctorParameters: () => [{ type: i1.Router }], propDecorators: { cardItem: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFjYW5jeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24tdXRlYW0tbGlicmFyeS9zcmMvbGliL3ZhY2FuY3kvdmFjYW5jeS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb21tb24tdXRlYW0tbGlicmFyeS9zcmMvbGliL3ZhY2FuY3kvdmFjYW5jeS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFVakQsTUFBTSxPQUFPLHVCQUF1QjtJQUVkO0lBQXBCLFlBQW9CLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUU5QixRQUFRLENBQUs7SUFFdEIsY0FBYyxDQUFDLElBQVk7UUFDekIsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUssQ0FBQztnQkFDSixPQUFPLFNBQVMsQ0FBQztZQUNuQixLQUFLLENBQUM7Z0JBQ0osT0FBTyxTQUFTLENBQUM7WUFDbkIsS0FBSyxDQUFDO2dCQUNKLE9BQU8sU0FBUyxDQUFDO1lBQ25CO2dCQUNFLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsSUFBWTtRQUNwQixRQUFRLElBQUksRUFBRSxDQUFDO1lBQ2IsS0FBSyxDQUFDO2dCQUNKLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLEtBQUssQ0FBQztnQkFDSixPQUFPLFFBQVEsQ0FBQztZQUNsQixLQUFLLENBQUM7Z0JBQ0osT0FBTyxRQUFRLENBQUM7WUFDbEI7Z0JBQ0UsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELGtCQUFrQixDQUFDLElBQVk7UUFDN0IsUUFBUSxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUssWUFBWTtnQkFDZixPQUFPLFNBQVMsQ0FBQztZQUNuQixLQUFLLGdCQUFnQjtnQkFDbkIsT0FBTyxTQUFTLENBQUM7WUFDbkIsS0FBSyxTQUFTO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ25CLEtBQUssV0FBVztnQkFDZCxPQUFPLFNBQVMsQ0FBQztZQUNuQjtnQkFDRSxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVksRUFBQyxFQUFVO1FBQzlCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO3dHQW5EVSx1QkFBdUI7NEZBQXZCLHVCQUF1Qix5R0NYcEMsZ3VJQWlHTSwwZ0ZEMUZNLFlBQVk7OzRGQUlYLHVCQUF1QjtrQkFQbkMsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDOzJFQVFkLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2xpYi12YWNhbmN5JyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi92YWNhbmN5LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybDogJy4vdmFjYW5jeS5jb21wb25lbnQuY3NzJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVmFjYW5jeUxpYnJhcnlDb21wb25lbnQge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cclxuICBcclxuICBASW5wdXQoKSBjYXJkSXRlbTogYW55XHJcbiAgXHJcbiAgZ2V0U2tpbGxzQ29sb3IoaXRlbTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHN3aXRjaCAoaXRlbSkge1xyXG4gICAgICBjYXNlIDE6XHJcbiAgICAgICAgcmV0dXJuICcjNTBCMjI5JztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiAnI0ZBRDMwNSc7XHJcbiAgICAgIGNhc2UgMzpcclxuICAgICAgICByZXR1cm4gJyNFRTUzNTQnO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgZ2V0U2tpbGxzKGl0ZW06IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgY2FzZSAxOlxyXG4gICAgICAgIHJldHVybiAnSnVuaW9yJztcclxuICAgICAgY2FzZSAyOlxyXG4gICAgICAgIHJldHVybiAnTWlkZGxlJztcclxuICAgICAgY2FzZSAzOlxyXG4gICAgICAgIHJldHVybiAnU2VuaW9yJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGdldE1vdGl2YXRpb25Db2xvcihpdGVtOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoIChpdGVtKSB7XHJcbiAgICAgIGNhc2UgJ9CR0LXQtyDQvtC/0LvQsNGC0YsnOlxyXG4gICAgICAgIHJldHVybiAnI0ZGQUIwMCc7XHJcbiAgICAgIGNhc2UgJ9Cd0YPQttC90LAg0L/RgNCw0LrRgtC40LrQsCc6XHJcbiAgICAgICAgcmV0dXJuICcjQ0Y4N0YxJztcclxuICAgICAgY2FzZSAn0JfQsCDQtNC+0LvRjic6XHJcbiAgICAgICAgcmV0dXJuICcjMjk4Q0Y0JztcclxuICAgICAgY2FzZSAn0JfQsCDQvtC/0LvQsNGC0YMnOlxyXG4gICAgICAgIHJldHVybiAnIzIzQjlCMCc7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmlld1VzZXIoZXZlbnQ6IEV2ZW50LGlkOiBzdHJpbmcpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYGAsIGlkXSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgPHAgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICAgIHt7Y2FyZEl0ZW0udGl0bGV9fVxyXG4gICAgICAgXHJcbiAgICA8L3A+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2hhcHRlckNhcmRcIj5cclxuICAgICAgICA8cCBjbGFzcz1cImNoYXB0ZXJDYXJkLXRpdGxlXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAwO1wiPlxyXG4gICAgICAgICAgICDQmNGJ0YM6XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb29raW5nQ2FyZFwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImNoYXB0ZXJDYXJkLXZhbHVlIHRleHQxM0NhcHNcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDAuNXJlbTsgd2lkdGg6IDkwJTsgbWFyZ2luLWJvdHRvbTogNXB4O1wiPlxyXG4gICAgICAgICAgICAgICAge3sgY2FyZEl0ZW0/LnByb2Zlc3Npb24/Lm5hbWUgfCB1cHBlcmNhc2UgfX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBbbmdTdHlsZV09XCJ7ICdib3JkZXItY29sb3InOiBnZXRTa2lsbHNDb2xvcihjYXJkSXRlbS5wcm9mZXNzaW9uLmNvbXBldGVuY2VMZXZlbCkgfVwiIGNsYXNzPVwibG9va2luZ0NhcmQtbGV2ZWxcIiAqbmdJZj1cImNhcmRJdGVtPy5wcm9mZXNzaW9uPy5jb21wZXRlbmNlTGV2ZWxcIj5cclxuICAgICAgICAgICAgICAgIHt7IGdldFNraWxscyhjYXJkSXRlbS5wcm9mZXNzaW9uPy5jb21wZXRlbmNlTGV2ZWwpICB9fVxyXG4gICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibG9va2luZ0NhcmRcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjaGFwdGVyQ2FyZC12YWx1ZS1lbmdcIiA+XHJcbiAgICAgICAgICAgICAgICB7eyBjYXJkSXRlbT8ucHJvZmVzc2lvbj8ubmFtZUVuZyB8IHVwcGVyY2FzZSB9fVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgXHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjaGFwdGVyQ2FyZFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY2hhcHRlckNhcmQtdGl0bGVcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDAuNXJlbTtcIj5cclxuICAgICAgICAgICAg0KDQsNCx0L7RgtCwOlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFnc1wiPlxyXG4gICAgICAgICAgICA8IS0tIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2FyZEl0ZW0uc2tpbGxzXCI+IC0tPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIndvcmtcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ3b3JrVGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICDQpNGA0LjQu9Cw0L3RgS/Qn9GA0L7QtdC60YJcclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ3b3JrXCIgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwid29ya1RleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAg0KTRgNC40LvQsNC90YEv0J/RgNC+0LXQutGCXHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gPC9uZy1jb250YWluZXI+IC0tPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2hhcHRlckNhcmRcIj5cclxuICAgICAgICA8cCBjbGFzcz1cImNoYXB0ZXJDYXJkLXRpdGxlXCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAwLjVyZW07XCI+XHJcbiAgICAgICAgICAgINCd0LDQstGL0LrQuDpcclxuICAgICAgICA8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhZ3NcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjYXJkSXRlbS5za2lsbHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWdcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e2l0ZW0ubmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjaGFwdGVyQ2FyZFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY2hhcHRlckNhcmQtdGl0bGVcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDAuNXJlbTtcIj5cclxuICAgICAgICAgICAg0JzQvtGC0LjQstCw0YbQuNGPOlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW90aXZhdGlvbnNcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjYXJkSXRlbS5tb3RpdmF0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vdGl2YXRpb25cIiBbbmdTdHlsZV09XCJ7ICdiYWNrZ3JvdW5kJzogZ2V0TW90aXZhdGlvbkNvbG9yKGl0ZW0ubmFtZSkgfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGl0ZW0ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0UHJvZmlsZUNoYXB0ZXJcIiAoY2xpY2spPVwidmlld1VzZXIoJGV2ZW50LCBjYXJkSXRlbT8udXNlcj8ubmlja25hbWUpXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsb2dvXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2FyZEl0ZW0/LnVzZXI/LmltYWdlTGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgW3NyY109XCInYXNzZXRzL2F2YXRhcnMvJysgY2FyZEl0ZW0/LnVzZXI/LmltYWdlTGluayArICcucG5nJ1wiIGFsdD1cImF2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjYXJkSXRlbT8udXNlcj8uaW1hZ2VMaW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cIidhc3NldHMvYXZhdGFycy9kZWZhdWx0LnBuZydcIiBhbHQ9XCJhdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC13cmFwOiB3cmFwOyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyBtYXJnaW4tYm90dG9tOiAycHg7XCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZ1bGxOYW1lXCIgc3R5bGU9XCJtYXJnaW46IDA7XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3tjYXJkSXRlbT8udXNlcj8ubGFzdE5hbWV9fVxyXG4gICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmdWxsTmFtZVwiIHN0eWxlPVwibWFyZ2luOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7Y2FyZEl0ZW0/LnVzZXI/LmZpcnN0TmFtZX19XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFByb2ZpbGVDaGFwdGVyXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzPVwiZGF0ZVZhY2FuY3kgZGF0ZVRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICDRgNCw0LfQvNC10YnQtdC90L5cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImRhdGVWYWNhbmN5IGRhdGVWYWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAge3tjYXJkSXRlbS5jcmVhdGlvbkRhdGUgfCBkYXRlOiAnZGQuTU0ueXl5eScgfX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIFxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PiJdfQ==