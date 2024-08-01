import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-motivations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motivations.component.html',
  styleUrl: './motivations.component.css'
})
export class MotivationsComponent {

  tagsList: { id: number, name: string, color: string }[] = [
    { id: 1, name: 'Без оплаты', color: '#FFAB00' },
    { id: 2, name: 'Практика', color: '#CF87F1' },
    { id: 3, name: 'За долю', color: '#298CF4' },
    { id: 4, name: 'За оплату', color: '#23B9B0' }
  ];
  selectedTags: {id: number,  name: string, color: string }[] = [];

  @Output() tagsChanged = new EventEmitter<{ id: number,  name: string, color: string }[]>();

  selectTag(tag: {id: number, name: string, color: string }) {
    this.tagsList = this.tagsList.filter(t => t.name !== tag.name);
    this.selectedTags.push(tag);
    this.tagsChanged.emit(this.selectedTags);
  }

  deleteTag(tag: {id: number,  name: string, color: string }) {
    this.selectedTags = this.selectedTags.filter(t => t.name !== tag.name);
    this.tagsList.push(tag);
    this.tagsChanged.emit(this.selectedTags);
  }

}
