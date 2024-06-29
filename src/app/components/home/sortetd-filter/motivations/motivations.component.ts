import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-motivations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './motivations.component.html',
  styleUrl: './motivations.component.css'
})
export class MotivationsComponent {

  tagsList: { title: string, color: string }[] = [
    { title: 'Без оплаты', color: '#FFAB00' },
    { title: 'Практика', color: '#CF87F1' },
    { title: 'За долю', color: '#298CF4' },
    { title: 'За оплату', color: '#23B9B0' }
  ];

  selectedTags: { title: string, color: string }[] = [];

  selectTag(tag: { title: string, color: string }) {
    this.tagsList = this.tagsList.filter(t => t.title !== tag.title);
    this.selectedTags.push(tag);
  }

  deleteTag(tag: { title: string, color: string }) {
    this.selectedTags = this.selectedTags.filter(t => t.title !== tag.title);
    this.tagsList.push(tag);
  }

}
