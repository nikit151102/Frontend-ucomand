import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: null;
  type: string;
}

@Component({
  selector: 'app-type-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './type-project.component.html',
  styleUrl: './type-project.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeProjectComponent),
      multi: true
    }
  ]
})
export class TypeProjectComponent implements ControlValueAccessor, OnChanges, OnInit {
  tags: Tag[] = [
    { id: 1, name: 'Стартап', nameEng: '', competenceLevel: null, type: 'STARTUP' },
    { id: 2, name: 'Компания', nameEng: '', competenceLevel: null, type: 'COMPANY' },
    { id: 3, name: 'Разовый проект', nameEng: '', competenceLevel: null, type: 'ONE_TIME_PROJECT' },
  ];
  
  @Input() maxTags: number = 1;
  @Output() tagsChanged = new EventEmitter<Tag>();
  value: string = '';
  private onChange: (value: Tag) => void = () => {};
  private onTouched: () => void = () => {};

  showTagBlock = false;
  selectedTags: Tag[] = [];

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
  }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(tag: Tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      this.onChange(tag);
      this.tagsChanged.emit(tag);
      this.value = tag.name;
    }
  }

  deleteTag(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
      this.onChange(tag);
      this.tags.push(tag);
    }
  }

  getSelectedTagsText(): string {
    return this.selectedTags.map(tag => tag.name).join(', ');
  }

  writeValue(value: any): void {
    const tag = this.tags.find(tag => tag.type === value);
    if (tag) {
      this.selectTag(tag)
    } else {
      this.selectedTags = [];
    }
  }

  registerOnChange(fn: (value: Tag) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
