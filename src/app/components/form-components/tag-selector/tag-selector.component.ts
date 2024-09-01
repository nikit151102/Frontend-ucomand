import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Tag {
  id: number;
  name: string;
  competenceLevel: null;
  type: string;
}

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectorComponent),
      multi: true
    }
  ]
})
export class TagSelectorComponent implements ControlValueAccessor {

  @Input() tags: Tag[] = [];
  @Input() maxTags: number = 3;
  @Input() placeholderValue: string = '';
  @Output() tagsChanged = new EventEmitter<Tag[]>();

  private onChange: (value: Tag[]) => void = () => { };
  private onTouched: () => void = () => { };

  showTagBlock = false;
  selectedTags: Tag[] = [];


  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(tag: Tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      this.selectedTags.push(tag);
      this.onChange(this.selectedTags);
      this.tagsChanged.emit(this.selectedTags);
    }
    this.showTagBlock = false;
  }

  deleteTag(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
      this.onChange(this.selectedTags);
    }
  }

  writeValue(value: Tag[]): void {
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
      console.log("value",value)
    } else {
      this.selectedTags = [];
    }
    // Обновите отображение или выполните другую логику, если необходимо
  }
  
  registerOnChange(fn: (value: Tag[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Обработка состояния отключения, если нужно
  }


}
