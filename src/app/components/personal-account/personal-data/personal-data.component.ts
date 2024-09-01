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
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
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
      freeLink: [''],
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
    this.userData();
  }

  userData() {
    this.personalDataService.getCurrentUser().subscribe(
      (user: User) => {
        this.dataCurrentUser = user;
        this.cityOfResidence = user.cityOfResidence || {}; 
  
        this.personalDataForm.patchValue({
          name: user.firstName || '',  
          surname: user.lastName || '', 
          age: user.age || '',        
          gender: user.gender || '',  
          city: user.cityOfResidence?.name || '', 
          freeLink: user.freeLink || '', 
          aboutMe: user.aboutMe || '', 
          email: user.email,  
          telegram: user.telegram,  
          domain: '',  
          approval: false  
        });
      },
      (error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
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

  onSubmit(): void {
    if (this.personalDataForm.invalid) {
      this.personalDataForm.markAllAsTouched();
      return;
    }

    const formValues = this.personalDataForm.value;

    const user: User = {
      id: 0,  
      firstName: formValues.name,
      lastName: formValues.surname,
      gender: formValues.gender.toUpperCase(),  
      age: formValues.age,
      freeLink: formValues.freeLink,
      ownLink: '', 
      aboutMe: formValues.aboutMe,
      telegram: formValues.telegram,
      email: formValues.email,
      dateOfRegistration: new Date().toISOString(),  
      cityOfResidence: this.cityOfResidence,
      role: this.dataCurrentUser.role,  
    };

    this.personalDataService.updateUser(user).subscribe(
      response => {
        console.log('Данные успешно отправлены', response);
        this.userData();
      },
      error => {
        console.error('Ошибка при отправке данных:', error);
      }
    );
  }
}
