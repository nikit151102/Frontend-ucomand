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

  tagsList: { id: number, name: string, color: string, type: string }[] = [
    { id: 1, name: 'Без оплаты', color: '#FFAB00', type: 'MOTIVATION' },
    { id: 2, name: 'Практика', color: '#CF87F1', type: 'MOTIVATION' },
    { id: 3, name: 'За долю', color: '#298CF4', type: 'MOTIVATION' },
    { id: 4, name: 'За оплату', color: '#23B9B0', type: 'MOTIVATION' }
  ];
  selectedTags: { id: number, name: string, color: string, type: string }[] = [];

  getSkillsColor(item: string): string {
    switch (item) {
      case 'Без оплаты':
        return '#50B229';
      case 'Практика':
        return '#FAD305';
      case 'За долю':
        return '#EE5354';
      case 'За оплату':
        return '#23B9B0';
      default:
        return '';
    }
  }
  
  @Output() tagsChanged = new EventEmitter<{ id: number, name: string, color: string, type: string }[]>();
  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  selectTag(tag: { id: number, name: string, color: string, type: string }) {
    this.tagsList = this.tagsList.filter(t => t.name !== tag.name);
    this.selectedTags.push(tag);
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);
  }

  deleteTag(tag: { id: number, name: string, color: string, type: string }) {
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

  writeValue(value: { id: number, name: string, color: string, type: string }[]): void {
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
      this.updateAvailableTags();
      console.log("this.selectedTags", this.selectedTags)
    } else {
      this.selectedTags = [];
      this.updateAvailableTags();
    }
  }

  private updateAvailableTags() {
    this.tagsList = this.tagsList.filter(tag => !this.selectedTags.some(selectedTag => selectedTag.name === tag.name));
  }
}
