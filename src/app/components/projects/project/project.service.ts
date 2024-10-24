import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  activeTab: 'aboutProject' | 'tape' = 'aboutProject'
}
