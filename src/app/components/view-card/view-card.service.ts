import { Injectable } from '@angular/core';

export interface Vacancy {
  title: string;
  context: string;
  contextLevel: string;
  skills: string[];
  motivations: string[];
  date: string;
  description: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ViewCardService {

  constructor() { }

  selectedCard: any;

  typeCard : string = '';


}
