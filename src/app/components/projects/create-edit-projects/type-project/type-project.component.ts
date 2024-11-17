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
    { id: 1, name: 'Стартап', nameEng: '', competenceLevel: null, type: 'PROJECT' },
    { id: 2, name: 'Компания', nameEng: '', competenceLevel: null, type: 'PROJECT' },
    { id: 3, name: 'Разовый проект', nameEng: '', competenceLevel: null, type: 'PROJECT' },
  ];
  
  page: number = 0;
  @Input() maxTags: number = 3;
  @Input() placeholderValue: string = '';
  @Input() type: string = 'SKILL';
  @Input() service: any;
  @Output() tagsChanged = new EventEmitter<Tag>();
  value: string = '';
  private onChange: (value: Tag) => void = () => {};
  private onTouched: () => void = () => {};

  showTagBlock = false;
  selectedTags: Tag[] = [];

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    // this.tags = [];
    this.page = 0;
    // this.loadMoreTags();
  }

  // onScroll(event: any) {
  //   const { scrollTop, scrollHeight, clientHeight } = event.target;
  //   if (scrollTop + clientHeight >= scrollHeight - 20) {
  //     this.loadMoreTags();
  //   }
  // }

  loadMoreTags(): void {
    this.service.getTags(this.type, this.page, 1000).subscribe((results: any) => {
      if (results.length > 0) {
        this.page += 1;
        const newTags = results.filter((newTag: any) => !this.tags.some(tag => tag.id === newTag.id));
        this.tags = [...this.tags, ...newTags];
        this.loadMoreTags();
      }
    });
  }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(tag: Tag) {
    console.log("tag",tag)
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      // this.selectedTags.push(tag);
      this.onChange(tag);
      this.tagsChanged.emit(tag);
      this.value = tag.name;
      // this.tags = this.tags.filter(t => t.id !== tag.id);
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

  writeValue(value: Tag[]): void {
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
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
