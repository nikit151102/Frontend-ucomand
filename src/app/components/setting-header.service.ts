import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingHeaderService {

  constructor() { }

  post: boolean = false;
  shared: boolean = false;
  backbtn: boolean = false;

}
