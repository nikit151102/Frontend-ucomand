import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PersonalDataService } from './personal-data.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { CityOfResidence, User } from './user-interface';



@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [RadioButtonModule, CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit {
  ingredient!: string;

  personalDataForm: FormGroup;
  cities: any;
  filteredCities: any;
  dataCurrentUser!: User;
  cityOfResidence!: CityOfResidence;

  constructor(private fb: FormBuilder, private personalDataService: PersonalDataService) {
    this.personalDataForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      portfolio: [''],
      aboutMe: [''],
      email: ['', [Validators.required, Validators.email]],
      telegram: [''],
      domain: [''],
      approval: [false, Validators.requiredTrue]
    });
  }
  
  ngOnInit(): void {
    this.personalDataService.getCities().subscribe(
      (data) => {
        this.cities = data;
       
      },
      (error) => {
        console.error('Ошибка при загрузке тегов:', error);
      }
    );
    this.userData()
   
  }

  userData(){
    this.personalDataService.getCurrentUser().subscribe(
      (user: User) => {
        this.dataCurrentUser = user;
        this.cityOfResidence = user.cityOfResidence;
         // Заполнение формы данными пользователя
         this.personalDataForm.patchValue({
          name: user.firstName,
          surname: user.lastName,
          age: user.age,
          gender: user.gender,
          city: user.cityOfResidence.name,
          portfolio: user.freeLink,  // Если `portfolio` это ссылка, укажите правильное соответствие
          aboutMe: user.aboutMe,
          email: '',  // Если email не указан в данных, оставьте пустым или используйте значение по умолчанию
          telegram: '',  // Аналогично, если telegram не указан
          domain: '',  // Аналогично, если domain не указан
          approval: false  // Если approval изначально false, можете оставить так
        });
      },
      (error) => {
        console.error('Ошибка при загрузке тегов:', error);
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
    // `event` содержит выбранный объект
    this.cityOfResidence = event.value;
    console.log('Selected city:', this.cityOfResidence);
    // Установите значение формы city
    this.personalDataForm.get('city')?.setValue(this.cityOfResidence.name);
  }


  onSubmit(): void {

      // Получаем значения из формы
      const formValues = this.personalDataForm.value;
  
      // Создаем объект пользователя
      const user: User = {
        id: 0,  // Значение ID по умолчанию, если требуется, можно заменить на реальное значение
        firstName: formValues.name,
        lastName: formValues.surname,
        gender: formValues.gender.toUpperCase(),  // Преобразование в верхний регистр
        age: formValues.age,
        freeLink: formValues.portfolio,
        ownLink: '',  // Пустое значение по умолчанию, если требуется, можно заменить на реальное значение
        aboutMe: formValues.aboutMe,
        dateOfRegistration: new Date().toISOString(),  // Установите текущую дату или другое значение
        cityOfResidence: this.cityOfResidence,
        role: this.dataCurrentUser.role,  // Установите роль по умолчанию или в соответствии с вашими требованиями
      };
  
      // Отправляем данные
      this.personalDataService.updateUser(user).subscribe(
        response => {
          console.log('Данные успешно отправлены', response);
          this.userData()
        },
        error => {
          console.error('Ошибка при отправке данных:', error);
        }
      );
 
  }

}
