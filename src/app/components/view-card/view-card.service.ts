import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Vacancy {
  title: string;
  context: string;
  contextLevel: string;
  skills: string[];
  motivations: string[];
  date: string;
  description: string;
  fullName: string;
}

export interface User {
  name: string; // Имя пользователя.
  surname: string; // Фамилия пользователя.
  age: number; // Возраст пользователя.
  gender: string; // Пол пользователя ("male" или "female").
  city: string; // Город пользователя.
  portfolio: string; // Ссылка или текст, представляющий портфолио пользователя.
  aboutMe: string; // Описание о пользователе.
  email: string; // Адрес электронной почты пользователя.
  telegram: string; // Имя пользователя в Telegram.
  nickname: string; // Пользовательский ник, связанный с аккаунтом пользователя.
  phone: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewCardService {

  constructor(private http: HttpClient) { }

  selectedCard: any;
  selectedUser: User = {
    name: "Иван",
    surname: "Иванов",
    age: 30,
    gender: "male",
    city: "Москва",
    portfolio: "https://ivanov-portfolio.com",
    aboutMe: "Разработчик программного обеспечения с опытом работы в различных областях. Интересуюсь новыми технологиями и постоянно стремлюсь к саморазвитию.",
    email: "ivanov@example.com",
    telegram: "@ivanov",
    nickname: "ivanov_007",
    phone: "+7 123 456-78-90",
    url: "https://www.behance.net/admin1237"
  };

  typeCard: string = '';

  private domain = 'https://vm-7c43f39f.na4u.ru/api'; 

  getCardData(id: number): Observable<any> {
    console.log("id",id)
    const type = localStorage.getItem('routeTypeCard');
    return this.http.get(`${this.domain}/${type}/${id}`);
  }

}
