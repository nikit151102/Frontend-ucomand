import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';


interface Tag {
  id: number;
  name: string ;
  nameEng: string ;
  competenceLevel: number|null;
  type: string;
  color: string | null;
}

@Component({
  selector: 'app-tag-selected-level',
  templateUrl: './tag-selected-level.component.html',
  styleUrls: ['./tag-selected-level.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagSelectedLevelComponent),
      multi: true
    }
  ]
})
export class TagSelectedLevelComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() placeholderValue: string = '';
  @Input() maxTags: number = 10;
  tags: { id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null }[]  = [];
  page: number = 0;
  @Input() type: string = 'SKILL';
  @Input() service: any;

  @Output() tagsChanged = new EventEmitter<{ id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null }[]>();

  @ViewChild('dialog') dialog!: ElementRef;

  @ViewChild('selTag') selTag!: ElementRef;
  
  showTagBlock = false;
  selectedTags: { id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null }[] = [];
  selectedTag: { id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null } | null = null;
  searchQuery: string = '';
  filteredTags: { id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null }[] = [];

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tags']) {
      this.filterTags();
      if (changes['tags']) {
        this.tags = this.tags.filter(tag => !this.selectedTags.some(selectedTag => selectedTag.id === tag.id));
        this.updateFilteredTags()
      }
    }
  }

  ngOnInit(): void {
    this.tags = [];
    this.loadMoreTags();
  }

  toggleTagBlock(show: boolean) {
    this.showTagBlock = show;
  }

  onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      this.loadMoreTags();
    }
  }

  loadMoreTags() {
    this.service.getTags(this.type, this.page, 100).subscribe((results: any) => {
      if (results.length > 0) {
        this.page += 1;
        
        const newTags = results.filter((newTag: any) => !this.tags.some(tag => tag.id === newTag.id));
        
        this.tags = [...this.tags, ...newTags];
        this.updateFilteredTags();
      }
    });
  }
  

  scrollToView(tagElement: HTMLElement, offset: number = 0) {
    if (tagElement && this.dialog) {
      setTimeout(() => {
        const dialogRect = this.dialog.nativeElement.getBoundingClientRect();
        const elementRect = tagElement.getBoundingClientRect();
  
        // Вычисляем прокрутку внутри контейнера
        const scrollTop = elementRect.top - dialogRect.top + this.dialog.nativeElement.scrollTop - offset;
        this.dialog.nativeElement.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }, 0);
    }
  }

  selectTag(tag: any,  tagElement: HTMLElement) {
    this.scrollToView(tagElement);
    if (this.selectedTag && this.selectedTag.name === tag.name) {
      this.selectedTag = null;
    } else {
      this.selectedTag = { name: tag.name, id: tag.id, competenceLevel: tag.competenceLevel, color: tag.color, type: tag.type, nameEng: tag.nameEng };
      tagElement.style.paddingTop = '6px';
      tagElement.style.paddingBottom = '0px';
    }
    this.showTagBlock = true;
   
  }

  selectLevel(level: number, id: number, color: string = '', type: string, nameEng: string) {
    if (this.selectedTag) {
      const tagId = this.selectedTag.id; 
      if (this.selectedTags.length < this.maxTags || this.selectedTags.some(t => t.name === this.selectedTag!.name)) {
        let existingTag = this.selectedTags.find(t => t.name === this.selectedTag!.name);
        if (existingTag) {
          existingTag.competenceLevel = level;
          existingTag.color = color;
        } else {
          this.selectedTags.push({ 
            name: this.selectedTag.name, 
            id: this.selectedTag.id, 
            competenceLevel: level, 
            color: color, 
            type: type, 
            nameEng: nameEng 
          });
        }
        
        this.tags = this.tags.filter(t => t.id !== tagId);
        this.updateFilteredTags()
        
        this.selectedTag = null;
        this.showTagBlock = false;
        this.searchQuery = '';
        this.onChange(this.selectedTags);
        this.tagsChanged.emit(this.selectedTags);
      } else {

      }
    }
  }
  

  deleteTag(tag: { id: number; name: string; nameEng: string; competenceLevel: number | null; type: string, color: string | null }) {
    this.selectedTags = this.selectedTags.filter(t => t.id !== tag.id);
    this.tags.push(tag);
    this.updateFilteredTags()
    this.onChange(this.selectedTags);
    this.tagsChanged.emit(this.selectedTags);
  }

  reset() {
    this.selectedTags = [];
    this.tagsChanged.emit(this.selectedTags);
  }

  writeValue(value: Tag[]): void {

    if (value && Array.isArray(value)) {
      this.selectedTags = value;
      this.tags = this.tags.filter(tag => !value.some(selectedTag => selectedTag.id === tag.id));
    
      // Обновляем фильтрованные теги после удаления
      this.updateFilteredTags();
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
        return '';
    }
  }

  getSkillsColor(item: number): string {
    switch (item) {
      case 1:
        return '#50B229';
      case 2:
        return '#FAD305';
      case 3:
        return '#EE5354';
      default:
        return '';
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

  isEnglish(text: string): boolean {
    const englishRegex = /^[A-Za-z\s]+$/;
    return englishRegex.test(text);
  }

  languagesEng: boolean = false;

  filterTags() {
    this.updateFilteredTags()
  }


  private updateFilteredTags() {
    if (this.type == 'PROFESSION') {
      if (this.isEnglish(this.searchQuery)) {

        this.languagesEng = true;
        this.filteredTags = this.tags
          .filter(tag => tag.nameEng.toLowerCase().includes(this.searchQuery.toLowerCase())) 
          // .sort((a, b) => a.nameEng.localeCompare(b.nameEng)); 
      } else {

        this.languagesEng = false;
        this.filteredTags = this.tags
          .filter(tag => tag.name.toLowerCase().includes(this.searchQuery.toLowerCase())) 
          // .sort((a, b) => a.name.localeCompare(b.name)); 
      }
    }else{
      this.languagesEng = false;
      this.filteredTags = this.tags
        .filter(tag => tag.name.toLowerCase().includes(this.searchQuery.toLowerCase())) 
        // .sort((a, b) => a.name.localeCompare(b.name)); 
    }
  }


}
