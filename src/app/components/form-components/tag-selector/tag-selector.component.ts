import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface tag {
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
  styleUrl: './tag-selector.component.css'
})
export class TagSelectorComponent {

  @Input() tags: tag[] = [];
  @Input() maxTags: number = 3;
  @Input() placeholderValue: string = '';
  @Input() visibleText:boolean = false;
  showTagBlock = false;

  selectedTags: tag[] = [];

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(tag: tag) {
    if (!this.selectedTags.includes(tag) && this.selectedTags.length < this.maxTags) {
      this.selectedTags.push(tag);
    }
    this.showTagBlock = false;
  }
  

  deleteTag(tag: tag) {
    let index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }

}
