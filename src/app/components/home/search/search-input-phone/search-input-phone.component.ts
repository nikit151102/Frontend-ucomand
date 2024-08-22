import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingHeaderService } from '../../../setting-header.service';

@Component({
  selector: 'app-search-input-phone',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-input-phone.component.html',
  styleUrl: './search-input-phone.component.css'
})
export class SearchInputPhoneComponent {

  constructor(
    public settingHeaderService: SettingHeaderService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;

  ngAfterViewChecked() {
    if (this.settingHeaderService.searchinputVisible) {
      this.inputField.nativeElement.focus();
    }
  }

  showInputField() {
    this.settingHeaderService.searchinputVisible = true;

    // Обновляем представление
    this.cdr.detectChanges();

    this.inputField.nativeElement.focus();
  }

  hideInputField() {
    this.settingHeaderService.searchinputVisible = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (this.inputContainer && !this.inputContainer.nativeElement.contains(event.target)) {
      this.hideInputField();
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }


  searchText: string = '';


}
