import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-motivations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motivations.component.html',
  styleUrl: './motivations.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MotivationsComponent),
      multi: true
    }
  ]
})
export class MotivationsComponent {



  tagsList: { id: number, name: string, color: string }[] = [
    { id: 1, name: 'Без оплаты', color: '#FFAB00' },
    { id: 2, name: 'Практика', color: '#CF87F1' },
    { id: 3, name: 'За долю', color: '#298CF4' },
    { id: 4, name: 'За оплату', color: '#23B9B0' }
  ];
  selectedTags: {id: number,  name: string, color: string }[] = [];

  @Output() tagsChanged = new EventEmitter<{ id: number,  name: string, color: string }[]>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  selectTag(tag: {id: number, name: string, color: string }) {
    this.tagsList = this.tagsList.filter(t => t.name !== tag.name);
    this.selectedTags.push(tag);
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);
  }

  deleteTag(tag: {id: number,  name: string, color: string }) {
    this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name);
    this.tagsList.push(tag);
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);
  }
  
  reset() {
    this.selectedTags = [];
    this.tagsChanged.emit(this.selectedTags);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  writeValue(value: any): void {
    if (value) {
      this.selectedTags = value;
    } else {
      this.selectedTags = [];
    }
  }
}
