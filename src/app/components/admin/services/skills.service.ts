import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

interface tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: number;
  type: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private stages: any;


  constructor(private http: HttpClient) { }
  private domain = 'https://vm-7c43f39f.na4u.ru/api';
  type ="PROFESSION";
  
  getFunction(): Observable<any> {
    return this.http.get<any>(`${this.domain}/tags?types=SKILL`,);
  }

  addFunction(tag: tag): Observable<any> {
    return this.http.post<any>(`${this.domain}/tags`, tag);

  }

  deleteFunction(tagId: string): Observable<any> {
    return this.http.delete<any>(`${this.domain}/tags/${tagId}`,);

  }

  putFunction(tag: tag): Observable<any> {
    return this.http.put<any>(`${this.domain}/tags/${tag.id}`, { tag });
  }

}
