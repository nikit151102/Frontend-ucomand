import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class SortetdFilterService {

  constructor(private http: HttpClient) { }

  visible: boolean = false;

  private domain = `${environment.apiUrl}`;
   
  getTags(type: string, page: number, size=100): Observable<any> {
    return this.http.get(`${this.domain}/tags?page=${page}&size=${size}&types=${type}`);
  }


}
