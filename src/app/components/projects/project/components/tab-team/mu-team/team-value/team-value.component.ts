import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TagSelectorComponent } from '../../../../../../form-components/tag-selector/tag-selector.component';
import { SortetdFilterService } from '../../../../../../home/sortetd-filter/sortetd-filter.service';

@Component({
  selector: 'app-team-value',
  standalone: true,
  imports: [CommonModule, TagSelectorComponent],
  templateUrl: './team-value.component.html',
  styleUrl: './team-value.component.css'
})
export class TeamValueComponent {
  @Input() item: any;

  tags: any[] = [];

  showTagBlock = false;
  selectedTags: any[] = [];
  private onChange: (value: any) => void = () => { };

  constructor(public sortetdFilterService: SortetdFilterService,) { }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  value: any
  selectTag(tag: any) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < 1) {
      this.onChange(tag);
      this.value = tag.name;
    }
  }

  getSelectedTagsText(): string {
    return this.selectedTags.map(tag => tag.name).join(', ');
  }


  scrollToSelectorProfessions() {
    this.scrollToView(this.selectorProfessions);
  }

  onTagsChanged(tags: any[], formElement: string) {
    this.value = tags[0];
  }

  @ViewChild('dialog') dialog!: ElementRef;
  @ViewChild('selectorProfessions') selectorProfessions!: ElementRef;

  scrollToView(element: ElementRef, offset: number = 0) {
    if (element && this.dialog) {
      setTimeout(() => {
        const dialogRect = this.dialog.nativeElement.getBoundingClientRect();
        const elementRect = element.nativeElement.getBoundingClientRect();

        // Вычислите прокрутку внутри контейнера
        const scrollTop = elementRect.top - dialogRect.top + this.dialog.nativeElement.scrollTop - offset;
        this.dialog.nativeElement.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }, 0);
    }
  }


  
}
