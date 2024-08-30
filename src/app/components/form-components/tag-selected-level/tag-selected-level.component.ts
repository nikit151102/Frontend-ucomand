import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-tag-selected-level',
  templateUrl: './tag-selected-level.component.html',
  styleUrls: ['./tag-selected-level.component.css'],
  imports: [ CommonModule ],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectedLevelComponent),
      multi: true
    }
  ]
})
export class TagSelectedLevelComponent implements ControlValueAccessor {
  @Input() tags: { name: string, id: number }[] = [];
  @Input() placeholderValue: string = '';
  @Input() maxTags: number = 3;
  @Output() tagsChanged = new EventEmitter<{ name: string, id: number, competenceLevel: number, color: string }[]>();

  showTagBlock = false;
  selectedTags: { name: string, id: number, competenceLevel: number, color: string }[] = [];
  selectedTag: { name: string, id: number, competenceLevel: number, color: string } | null = null;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(name: string, id: number) {
    if (this.selectedTag && this.selectedTag.name === name) {
      this.selectedTag = null;
    } else {
      this.selectedTag = { name: name, id: id, competenceLevel: 0, color: ''  };
    }
    this.showTagBlock = true;
  }

  selectLevel(level: number, id: number , color: string = '') {
    if (this.selectedTag) {
      if (this.selectedTags.length < this.maxTags || this.selectedTags.some(t => t.name === this.selectedTag!.name)) {
        let existingTag = this.selectedTags.find(t => t.name === this.selectedTag!.name);
        if (existingTag) {
           existingTag.competenceLevel = level;
           existingTag.color = color;
        } else {
          this.selectedTags.push({ name: this.selectedTag.name, id: this.selectedTag.id, competenceLevel: level, color: color});
        }
        this.selectedTag = null;
        this.showTagBlock = false;
        this.onChange(this.selectedTags); // Сообщаем Angular формам о новом значении
        this.tagsChanged.emit(this.selectedTags); // Emit event with updated tags
      } else {
        // alert(You can select up to ${this.maxTags} tags only.);
      }
    }
  }
  
  deleteTag(tag: { name: string, id: number, competenceLevel: number }) {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    this.onChange(this.selectedTags); // Сообщаем Angular формам о новом значении
    this.tagsChanged.emit(this.selectedTags); // Вызываем событие с обновленными тегами
  }

  // Реализация ControlValueAccessor
  writeValue(value: any): void {
    if (value) {
      this.selectedTags = value;
    } else {
      this.selectedTags = [];
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Обработка состояния disabled, если необходимо
  }
  getCompetenceLevel(level: number): string {
    switch (level) {
      case 1:
        return 'junior';
      case 2:
        return 'middle';
      case 3:
        return 'senior';
      default:
        return ''; // Если 0 или другое значение, вернет пустую строку
    }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.tag-block') && !target.closest('.tag-input')) {
      this.showTagBlock = false;
    }
  }

  @HostListener('click', ['$event'])
  onClickInside(event: MouseEvent) {
    event.stopPropagation();
  }
}
