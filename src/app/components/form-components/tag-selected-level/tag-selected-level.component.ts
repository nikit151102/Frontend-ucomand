import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-tag-selected-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-selected-level.component.html',
  styleUrl: './tag-selected-level.component.css'
})
export class TagSelectedLevelComponent {

  @Input() tags: string[] = [];
  @Input() placeholderValue: string = '';
  @Input() maxTags:number = 3;

  showTagBlock = false;
  selectedTags: { name: string, level?: string, type: string, color: string }[] = [];
  selectedTag: { name: string } | null = null;

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(name: string ) {
    if (this.selectedTag && this.selectedTag.name === name) {
      this.selectedTag = null; 
    } else {
      this.selectedTag = {name: name};
    }
    this.showTagBlock = true;
  }

  selectLevel(level: string, type: string = '', color: string = '') {
    if (this.selectedTag) {
      if (this.selectedTags.length < this.maxTags || this.selectedTags.some(t => t.name === this.selectedTag!.name)) {
        let existingTag = this.selectedTags.find(t => t.name === this.selectedTag!.name);
        if (existingTag) {
          existingTag.level = level;
          existingTag.type = type;
          existingTag.color = color;
        } else {
          this.selectedTags.push({ name: this.selectedTag.name, level: level, type: type, color: color });
        }
        this.selectedTag = null;
        this.showTagBlock = false;
      } else {
        // alert(`You can select up to ${this.maxTags} tags only.`);
        
      }
    }
  }

  deleteTag(tag: { name: string, level?: string }) {
    this.selectedTags = this.selectedTags.filter(t => t !== tag);
  }

  
  isInsideTagBlock = false;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.tag-block') && !target.closest('.tag-input')) {
      this.showTagBlock = false;
    }
  }


  @HostListener('click', ['$event'])
  onClickInside(event: MouseEvent) {
    this.isInsideTagBlock = true;
    event.stopPropagation();
  }
}