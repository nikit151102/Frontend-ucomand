import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

interface Tag {
  id: number;
  name: string;
  nameEng: string;
  competenceLevel: null;
  type: string;
}

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
export class TagSelectorComponent implements ControlValueAccessor, OnChanges, OnInit {

  tags: Tag[] = [];
  page: number = 0;
  @Input() maxTags: number = 3;
  @Input() placeholderValue: string = '';
  @Input() type: string = 'SKILL';
  @Input() service: any;

  @Output() tagsChanged = new EventEmitter<Tag[]>();

  private onChange: (value: Tag[]) => void = () => { };
  private onTouched: () => void = () => { };

  showTagBlock = false;
  selectedTags: Tag[] = [];
  searchQuery: string = '';
  filteredTags: Tag[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tags']) {
      this.updateFilteredTags();
    }
  }

  ngOnInit(): void {
    this.tags = [];
    this.page = 0;
    this.loadMoreTags();
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.loadMoreTags();
    }
  }

  // loadMoreTags() {
  //   this.service.getTags(this.type, this.page, 100).subscribe((results: any) => {
  //     if (results.length > 0) {
  //       this.page += 1;
        
  //       const newTags = results.filter((newTag: any) => !this.tags.some(tag => tag.id === newTag.id));
        
  //       this.tags = [...this.tags, ...newTags];
  //       this.updateFilteredTags();
  //     }
  //   });
  // }
  
  loadMoreTags(): void {
    this.service.getTags(this.type, this.page, 1000).subscribe((results: any) => {
      if (results.length > 0) {
        this.page += 1;
  
        const newTags = results.filter((newTag: any) => !this.tags.some(tag => tag.id === newTag.id));
        this.tags = [...this.tags, ...newTags];
        
        this.updateFilteredTags();
  
        // Рекурсивный вызов для подгрузки следующих данных
        this.loadMoreTags();
      }
    });
  }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
      if (show) {
        this.updateFilteredTags();
      }
    }, 200);
  }

  selectTag(tag: Tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      this.selectedTags.push(tag);
      this.onChange(this.selectedTags);
      this.tagsChanged.emit(this.selectedTags);

      this.tags = this.tags.filter(t => t.id !== tag.id);
      this.searchQuery = '';
      this.updateFilteredTags();
    }
  }


  deleteTag(tag: Tag) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
      this.onChange(this.selectedTags);

      this.tags.push(tag);

      this.updateFilteredTags();
    }
  }


  writeValue(value: Tag[]): void {
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
    } else {
      this.selectedTags = [];
    }
    this.updateFilteredTags();
  }

  registerOnChange(fn: (value: Tag[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  filterTags() {
    this.updateFilteredTags()
  }

  isEnglish(text: string): boolean {
    const englishRegex = /^[A-Za-z\s]+$/;
    return englishRegex.test(text);
  }

  languagesEng: boolean = false;

  // private updateFilteredTags() {
  //   if (this.type === 'PROFESSION') {
  //     if (this.isEnglish(this.searchQuery)) {
  //       this.languagesEng = true;
  //       this.filteredTags = this.tags
  //         .filter(tag => tag.nameEng && tag.nameEng.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //         // .sort((a, b) => a.nameEng.localeCompare(b.nameEng));
  //     } else {
  //       this.languagesEng = false;
  //       this.filteredTags = this.tags
  //         .filter(tag => tag.name && tag.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //         // .sort((a, b) => a.name.localeCompare(b.name));
  //     }
  //   } else {
  //     this.languagesEng = false;
  //     this.filteredTags = this.tags
  //       .filter(tag => tag.name && tag.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
  //       // .sort((a, b) => a.name.localeCompare(b.name));
  //   }
  // }
  private updateFilteredTags() {
    if (this.type === 'PROFESSION') {
      if (this.isEnglish(this.searchQuery)) {
        this.languagesEng = true;
        this.filteredTags = this.tags
          .filter(tag => tag.nameEng && tag.nameEng.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
          // .sort((a, b) => a.nameEng.localeCompare(b.nameEng));
      } else {
        this.languagesEng = false;
        this.filteredTags = this.tags
          .filter(tag => tag.name && tag.name.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
          // .sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      this.languagesEng = false;
      this.filteredTags = this.tags
        .filter(tag => tag.name && tag.name.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
        // .sort((a, b) => a.name.localeCompare(b.name));
    }
  }
  
}
