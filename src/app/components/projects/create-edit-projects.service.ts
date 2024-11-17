import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateEditProjectsService {

  constructor() { }
  
  private formData: any = null;

  setFormData(data: any): void {
    this.formData = data;
  }

  getFormData(): any {
    return this.formData;
  }

  clearFormData(): void {
    this.formData = null;
  }
}
