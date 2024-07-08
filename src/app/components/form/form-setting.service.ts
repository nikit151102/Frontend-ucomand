import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormSettingService {

  constructor() { }

  typeForm: string = '';
  title: string = '';

  isEdit: boolean = false;
  isheading: boolean = false;

}
