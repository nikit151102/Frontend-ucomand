import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtiesService {


  // Данные для тестирования
  private stages = [
    { id: 1, name: 'Frontend-разработчик' },
    { id: 2, name: 'Backend-разработчик' },
    { id: 3, name: 'Full Stack разработчик' },
    { id: 4, name: 'DevOps-инженер' },
    { id: 5, name: 'Мобильный разработчик' },
    { id: 6, name: 'Data Scientist' },
    { id: 7, name: 'Аналитик данных' },
    { id: 8, name: 'Инженер по машинному обучению' },
    { id: 9, name: 'UI/UX дизайнер' },
    { id: 10, name: 'Специалист по кибербезопасности' },
    { id: 11, name: 'Архитектор облачных решений' },
    { id: 12, name: 'Сетевой инженер' },
    { id: 13, name: 'IT-специалист по поддержке' },
    { id: 14, name: 'Системный администратор' },
    { id: 15, name: 'Разработчик игр' },
    { id: 16, name: 'QA-инженер' },
    { id: 17, name: 'Администратор баз данных' },
    { id: 18, name: 'Продуктовый менеджер' },
    { id: 19, name: 'Scrum Master' }
  ];
  

  constructor(private http: HttpClient) { }
  api: string = 'http://127.0.0.1:8000/';  //127.0.0.1

  getFunction(): Observable<any> {
    // const token = localStorage.getItem('director_token');
    // if (token) {
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.get<any>(`${this.api}director/stageApplication/getStages`, { headers });
    // } else {
    //   throw new Error('Token not found');
    // }

    // Используем фейковые данные для тестирования
    return of(this.stages);
  }

  addFunction(nameStatus: string): Observable<any> {
    // const token = localStorage.getItem('director_token');
    // if (token) {
    //   let params = new HttpParams();
    //   params = params.set('name', nameStatus);
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.post<any>(`${this.api}director/stageApplication/setStage`, {}, { headers, params });
    // } else {
    //   throw new Error('Token not found');
    // }

    // Добавляем новый статус в фейковые данные
    const newStage = { id: this.stages.length + 1, name: nameStatus };
    this.stages.push(newStage);
    return of(newStage);
  }

  deleteFunction(status_id: number): Observable<any> {
    // const token = localStorage.getItem('director_token');
    // if (token) {
    //   let params = new HttpParams();
    //   params = params.set('name', status_id);
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.delete<any>(`${this.api}director/stageApplication/setStage`, { headers, params });
    // } else {
    //   throw new Error('Token not found');
    // }

    // Удаляем статус из фейковых данных
    this.stages = this.stages.filter(stage => stage.id !== status_id);
    return of({ success: true });
  }

  putFunction(stage_id: number, newStage: string): Observable<any> {
    // const token = localStorage.getItem('director_token');
    // if (token) {
    //   let params = new HttpParams();
    //   params = params.set('stage_id', stage_id);
    //   params = params.set('new_name', newStage);
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   });
    //   return this.http.put<any>(`${this.api}director/stageApplication/updateStage`, {}, { headers, params });
    // } else {
    //   throw new Error('Token not found');
    // }

    // Обновляем статус в фейковых данных
    const stage = this.stages.find(stage => stage.id === stage_id);
    if (stage) {
      stage.name = newStage;
    }
    return of(stage);
  }
}
