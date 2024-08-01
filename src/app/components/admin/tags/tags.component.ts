import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ExcelReaderComponent } from '../excel-reader/excel-reader.component';

interface statusValue { 'id': number, 'name': string }

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgIf, TableModule, ToastModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, OrderListModule, OverlayPanelModule, DropdownModule, ExcelReaderComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  @Input() Service: any;
  @Input() Title: string = '';
  @Input() IsDropList: boolean = false;

  products!: statusValue[];
  clonedProducts: { [s: string]: statusValue } = {};
  newStatus: string = '';
  selectedStage: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.getdataStatusses();

  }

  getdataStatusses() {
    this.Service.getFunction().subscribe(
      (response: statusValue[]) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  onRowEditInit(product: statusValue) {
    this.clonedProducts[product.id as number] = { ...product };
    console.log("clonedProducts", this.clonedProducts)
  }

  onRowEditSave(product: statusValue) {
    if (product.name && product.name != '') {
      this.getdataStatusses();
      this.Service.putFunction(product['id'], product['name']).subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки изменен', life: 2000 });
          this.getdataStatusses();
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при изменении статуса заявки', life: 2000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пожалуйста, проверьте введенные данные', life: 2000 });
    }
  }

  onRowEditCancel(product: statusValue, index: number) {
    this.products[index] = this.clonedProducts[product.id as number];
    delete this.clonedProducts[product.id as number];
    this.messageService.add({ severity: 'error', summary: 'Отклонено', detail: 'Действие отменено', life: 2000 });
  }

  createStatus() {
    if (this.newStatus && this.newStatus != '') {
        this.Service.addFunction(this.newStatus, this.selectedStage.id)
          .subscribe(
            (response: any) => {
              this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки добавлен', life: 2000 });
              this.getdataStatusses();
              this.newStatus = '';
            },
            (error: any) => {
              this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при добавлении статуса', life: 2000 });
            }
          );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Пожалуйста, проверьте введенные данные', life: 2000 });
    }
  }

  onRowDelete(status: statusValue) {
    this.Service.deleteFunction(status['id'])
      .subscribe(
        (response: any) => {
          this.messageService.add({ severity: 'success', summary: 'Подтверждено', detail: 'Статус заявки успешно удален', life: 2000 });
          this.getdataStatusses();
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении статуса', life: 2000 });
        }
      );
  }

}
