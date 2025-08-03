import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MotivationsService {

  constructor(private http: HttpClient) { }


  getTags(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/main/tag?types=MOTIVATION`);
  }
  
}
