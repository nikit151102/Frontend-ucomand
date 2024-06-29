import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag-selector.component.html',
  styleUrl: './tag-selector.component.css'
})
export class TagSelectorComponent {

  @Input() tags: string[] = [];
  @Input() placeholderValue: string = '';

  showTagBlock = false;

  selectedTags: string[] = [];

  toggleTagBlock(show: boolean) {
    // Добавляем небольшой таймаут, чтобы blur не скрывал блок до клика по тегу
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  selectTag(tag: string) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
    this.showTagBlock = false;
  }

  deleteTag(tag: string) {
    // Удаление элемента 'banana'
    let index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }

}
