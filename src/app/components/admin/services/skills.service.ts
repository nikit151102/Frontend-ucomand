import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  // Данные для тестирования
  private stages = [
    { id: 1, name: 'Яндекс Трекер' },
    { id: 2, name: 'Юзабилити-аудит сайта' },
    { id: 3, name: 'Установка и обслуживание офисной техники' },
    { id: 4, name: 'Контекстная реклама' },
    { id: 5, name: 'САПР' },
    { id: 6, name: 'Objective-С' },
    { id: 7, name: '3d анимация' },
    { id: 8, name: 'XML' },
    { id: 9, name: 'Webflow' },
    { id: 10, name: 'Web 3.0' },
    { id: 11, name: 'Objective-С' },
    { id: 12, name: 'Android User Interface Guidelines' },
    { id: 13, name: 'Android User Interface Guidelines' },
    { id: 14, name: 'Objective-С' },
    { id: 15, name: 'Objective-С' },
    { id: 16, name: 'Android User Interface Guidelines' },
    { id: 17, name: 'Android User Interface Guidelines' },
    { id: 18, name: 'Objective-С' },
    { id: 19, name: 'Objective-С' }
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
