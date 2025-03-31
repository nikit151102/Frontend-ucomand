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
  maxTags: number = 1;
  @Input() placeholderValue: string = '';
  @Input() type: string = 'SKILL';
  @Input() service: any;
  @Input() selectedTag!: Tag;

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

    if (changes['selectedTag'] && changes['selectedTag'].currentValue) {
      this.selectedTags = [this.selectedTag]; // Устанавливаем переданный тег
      this.searchQuery = this.selectedTag.nameEng || this.selectedTag.name;
      this.updateFilteredTags();
    }
  }
  

  ngOnInit(): void {
    this.tags = [];
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
    this.service.getTags(this.type).subscribe((results: any) => {
      if (results.length > 0) {
        const newTags = results.filter((newTag: any) => !this.tags.some(tag => tag.id === newTag.id));
        this.tags = [...this.tags, ...newTags];
        
        this.updateFilteredTags();
      }
    });
  }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
      if (show) {
        // Очистка запроса перед открытием списка тегов
        this.searchQuery = '';
        this.updateFilteredTags();
      }
    }, 200);
  }
  

  selectTag(tag: Tag) {
    this.selectedTags = []
    if (!this.selectedTags.some(t => t.id === tag.id) && this.selectedTags.length < this.maxTags) {
      this.selectedTags.push(tag);
      this.onChange(this.selectedTags);
      this.tagsChanged.emit(this.selectedTags);
  
      this.searchQuery = tag.nameEng && this.languagesEng ? tag.nameEng : tag.name;
  
      this.updateFilteredTags();
    }
  }
  



  writeValue(value: Tag[]): void {
    console.log('value',value)
    if (value && Array.isArray(value)) {
      this.selectedTags = value;
    } else {
      this.selectedTags = [];
    }
    this.updateFilteredTags();
  }
registerOnChange(fn: (value: Tag[]) => void): void {
  console.log('registerOnChange called');
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
    this.filteredTags = this.tags.filter(tag => 
      !this.selectedTags.some(selected => selected.id === tag.id) && // Скрываем выбранные
      (this.isEnglish(this.searchQuery) 
        ? tag.nameEng?.toLowerCase().startsWith(this.searchQuery.toLowerCase()) 
        : tag.name?.toLowerCase().startsWith(this.searchQuery.toLowerCase()))
    );
  }
  
  
  
}
