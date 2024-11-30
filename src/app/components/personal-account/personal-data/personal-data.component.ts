import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PersonalDataService } from './personal-data.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CityOfResidence, User } from './user-interface';
import { Router } from '@angular/router';
import { PopUpAvatarComponent } from '../../pop-up-avatar/pop-up-avatar.component';
import { PopUpAvatarService } from '../../pop-up-avatar/pop-up-avatar.service';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { AvatarSelectionService } from '../../pop-up-avatar/avatar-selection.service';
import { SettingHeaderService } from '../../setting-header.service';
import { MenuNavService } from '../../menu-nav/menu-nav.service';
import { forbiddenWordsValidator } from '../../../../validators/forbidden-words.validator';

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule, PopUpAvatarComponent],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
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
export class PersonalDataComponent implements OnInit {
  personalDataForm: FormGroup;
  cities: any;
  filteredCities: any;
  dataCurrentUser!: User;
  cityOfResidence!: CityOfResidence;
  isPopupVisible: boolean = false;
  setAvatar: string | null = '';
  setGender: string | null = '';
  setTypeAvatar: string | null = '';
  isDisabled = false;
  oldDomain: string = ''
  cancel_btn: boolean = false;
  initialFormState: any;


  @ViewChildren('formField') formFields!: QueryList<ElementRef>;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private personalDataService: PersonalDataService,
    private router: Router, public popUpAvatarService: PopUpAvatarService,
    private avatarSelectionService: AvatarSelectionService, private settingHeaderService: SettingHeaderService, public menuNavService: MenuNavService) {
    this.personalDataForm = this.fb.group({
      name: ['', [Validators.required, forbiddenWordsValidator()]],
      surname: ['', [Validators.required, forbiddenWordsValidator()]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      freeLink: ['' ],
      aboutMe: ['', [Validators.maxLength(700), forbiddenWordsValidator()]],
      email: ['', [Validators.required, Validators.email]],
      telegram: [{ value: '', disabled: true }, [Validators.required,forbiddenWordsValidator()]],
      domain: ['', [Validators.required, forbiddenWordsValidator()]],
    });
  }


  get forbiddenWords() {
    return this.personalDataForm.get('description')?.errors?.['forbiddenWords'] || [];
  }
  formChanges() {
    this.personalDataForm.valueChanges.subscribe((changes) => {
      if (this.areAllFieldsEmpty() || this.isFormUnchanged()) {
        this.cancel_btn = false;
      }
      else {
        this.cancel_btn = true;
      }
    });
  }

  areAllFieldsEmpty(): boolean {
    return Object.values(this.personalDataForm.value).every(value => value === '');
  }

  isFormUnchanged(): boolean {
    return JSON.stringify(this.personalDataForm.value) === JSON.stringify(this.initialFormState);
  }

  onCancel() {
    if (this.initialFormState) {
      this.personalDataForm.patchValue(this.initialFormState);
    } else {
      this.personalDataForm.reset();
    }
    this.cancel_btn = false;
  }


  ngOnInit(): void {
    this.settingHeaderService.shared = true;
    this.settingHeaderService.post = true;
    this.settingHeaderService.backbtn = true;
    this.avatarSelectionService.selectedAvatar$.subscribe(selectedAvatar => {
      this.setAvatar = selectedAvatar
    });

    this.avatarSelectionService.selectedTypeAvatar$.subscribe(selectedTypeAvatar => {
      this.setTypeAvatar = selectedTypeAvatar
      this.personalDataForm.get('gender')?.setValue(this.setTypeAvatar?.toUpperCase());
    });

    this.subscription.add(
      this.popUpAvatarService.visible$.subscribe(visible => {
        this.isPopupVisible = visible;
      })
    );
    this.personalDataService.getCities().subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    );
    this.userData();
    this.personalDataForm.get('gender')?.valueChanges.subscribe(value => {
      this.setGender = value;
    });
    // this.toggleDisable()
  }


  forbiddenWordsValidator(value: string) {
    this.personalDataService.validatorDomain(value.toLowerCase()).subscribe((data: any) => {
      if (data === false) {
        this.personalDataForm.get('domain')?.setErrors({ forbiddenWords: true });
      } else {
        this.personalDataForm.get('domain')?.setErrors(null);
      }
    })
  }

  getAvatar() {
    this.popUpAvatarService.showPopup();
  }

  // toggleDisable() {
  //   this.isDisabled = !this.isDisabled;
  //   if (this.isDisabled) {
  //     this.personalDataForm.get('domain')?.disable();
  //   } else {
  //     this.personalDataForm.get('domain')?.enable();
  //   }
  // }


  userData() {
    this.personalDataService.getCurrentUser().subscribe(
      (user: User) => {
        if (user && user.nickname && user.id) {
          if (user.imageLink) {
            this.menuNavService.setStorageValue(user.imageLink);
          } this.personalDataForm.patchValue({
            name: user.firstName || '',
            surname: user.lastName || '',
            age: user.age || '',
            gender: user.gender || '',
            city: user.cityOfResidence?.name || '',
            freeLink: user.freeLink || '',
            aboutMe: user.aboutMe || '',
            email: user.email,
            telegram: user.telegram,
            domain: user.nickname || '',
          });
          this.dataCurrentUser = user;
          this.cityOfResidence = user.cityOfResidence || {};
          this.setAvatar = user.imageLink;

          if (user.nickname) {
            this.oldDomain = user.nickname;
          }
          this.personalDataForm.get('domain')?.valueChanges.subscribe(value => {
            if (value !== this.oldDomain && value.length > 0) {
              this.forbiddenWordsValidator(value)
            }
          });
          this.setGender = user.gender;
          this.initialFormState = this.personalDataForm.value;
          this.formChanges();
        }
        else{
          localStorage.removeItem('userNickname');
          localStorage.removeItem('authToken');
          localStorage.removeItem('fullAccess');
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
        console.log('error.status', error)
        localStorage.removeItem('userNickname');
        localStorage.removeItem('authToken');
        localStorage.removeItem('fullAccess');
        this.router.navigate(['/']);
        if (error.status) {
          this.router.navigate(['/error', error.status.toString()]);
        } else {
          this.router.navigate(['/error', { num: "500" }]);
        }
      }
    );
  }

  filterCities(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.cities as any[]).length; i++) {
      let country = (this.cities as any[])[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    this.filteredCities = filtered;
  }

  onCitySelect(event: any) {
    this.cityOfResidence = event.value;
    this.personalDataForm.get('city')?.setValue(this.cityOfResidence.name);
  }

  isCityValid(city: string): boolean {
    return this.cities.some((c: any) => c.name === city);
  }



  isError: boolean = false;

  scrollToField(invalidField: any) {
    invalidField.nativeElement.scrollIntoView({ behavior: 'smooth' });

    const offset = 130;
    const elementRect = invalidField.nativeElement.getBoundingClientRect();
    const elementScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    window.scrollTo({
      top: elementRect.top + elementScrollTop - offset,
      behavior: 'smooth'
    });
  }

  setVisibleError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }

  getInputInval(scrollfocus: boolean) {
    this.personalDataForm.markAllAsTouched();
    const invalidField = this.formFields.find((field) => {
      const controlName = field.nativeElement?.getAttribute('formControlName');
      const control = this.personalDataForm.get(controlName);

      return control ? control.invalid : false;
    });
    const isMobileOrTablet = window.innerWidth < 1024;
    if (invalidField) {
      if (isMobileOrTablet && scrollfocus) {
        this.scrollToField(invalidField)
      }

      this.setVisibleError();
    }
  }

  @ViewChild('formField') cityField!: ElementRef;

  onSubmit() {
    const selectedCity = this.personalDataForm.get('city')?.value;
    const selectedCityControl = this.personalDataForm.get('city');

    if (!this.isCityValid(selectedCity)) {
      this.getInputInval(false);
      selectedCityControl?.setErrors({ invalidCity: true });
      const isMobileOrTablet = window.innerWidth < 1024;

      if (isMobileOrTablet) {
        if (this.cityField) {
          this.scrollToField(this.cityField);
        }
      }
      selectedCityControl?.markAsTouched();
      this.setVisibleError();
      return;
    }

    if (this.personalDataForm.invalid) {
      this.getInputInval(true);
    } else {
      const formValues = this.personalDataForm.value;

      const user: User = {
        id: 0,
        firstName: formValues.name,
        lastName: formValues.surname,
        gender: formValues.gender.toUpperCase(),
        age: Number(formValues.age),
        freeLink: formValues.freeLink,
        ownLink: '',
        aboutMe: formValues.aboutMe.replace(/\r?\n/g, '\n'),
        telegram: formValues.telegram,
        email: formValues.email,
        dateOfRegistration: this.dataCurrentUser.dateOfRegistration,
        cityOfResidence: this.cityOfResidence,
        imageLink: this.setAvatar,
        nickname: formValues.domain,
        role: this.dataCurrentUser.role,
        banned: this.dataCurrentUser.banned
      };
      console.log("User", user)
      this.personalDataService.updateUser(user).subscribe(
        response => {
          this.userData();
          localStorage.setItem('userId', formValues.domain);
          localStorage.setItem('userNickname', formValues.domain);
          const userId = localStorage.getItem('userId')
          localStorage.setItem('fullAccess', 'b326b5062b2f0e69046810717534cb09');
          this.router.navigate([`/myaccount/${userId}/home`]);
        },
        error => {
          console.error('Ошибка при отправке данных:', error);
        }
      );
    }
  }
}
