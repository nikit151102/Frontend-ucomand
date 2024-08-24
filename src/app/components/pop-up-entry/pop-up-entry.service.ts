import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpEntryService {

  constructor(private http: HttpClient) { }

  visible: boolean = false;
  userVisible: boolean = false;
  private domain = 'http://5.181.253.239:8080';

  getUser(): Observable<any> {
    return this.http.get(`${this.domain}/admins/rootToken`);
  }


  showDialog() {
    this.visible = true;
  }



}
