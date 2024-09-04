import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsComponent } from './forms/forms.component';
import { ListCardsService } from './list-cards.service';

@Component({
  selector: 'app-list-cards',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ToastModule, FormsComponent],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.css'
})
export class ListCardsComponent {
  products!: any[];
  @Input() Service!: any;
  expandedRows = {};

  constructor(public listCardsService: ListCardsService) { }

  ngOnInit() {
    this.Service.getData();
  }

  expandAll() {
    this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }


  onRowExpand(event: TableRowExpandEvent) {

  }

  onRowCollapse(event: TableRowCollapseEvent) {

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

  getSkills(item: number): string {
    switch (item) {
      case 1:
        return 'Junior';
      case 2:
        return 'Middle';
      case 3:
        return 'Senior';
      default:
        return '';
    }
  }

  getSkillText(item: number): string {
    switch (item) {
      case 1:
        return 'Jun';
      case 2:
        return 'Mdl';
      case 3:
        return 'Snr';
      default:
        return '';
    }
  }

  editData: any;
  editCard(card: any) {
    this.editData = card;
    this.listCardsService.visibleForm = true;
  }

}