import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TypeProjectService {

  constructor(private http: HttpClient) { }

  // getTypeData(id: number, typeCard:string): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/${typeCard}/${id}`);
  // }

  
}
