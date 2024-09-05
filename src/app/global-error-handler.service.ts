import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SettingHeaderService } from './components/setting-header.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router, private settingHeaderService: SettingHeaderService) { }

  handleError(error: any): void {

    this.router.navigate(['/error', { num: error.status || 500 }]);
  }
}