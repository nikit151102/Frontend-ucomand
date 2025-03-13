import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { SortetdFilterService } from '../../../../../../home/sortetd-filter/sortetd-filter.service';
import { TagSelectorComponent } from '../../../tag-selector/tag-selector.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../../../environment';
import { ProjectService } from '../../../../project.service';
import { MyTeamService } from '../my-team.service';

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
  originalTag: any | null = null;

  constructor(public sortetdFilterService: SortetdFilterService,
    public projectService: ProjectService,
    private http: HttpClient,
    private myTeamService: MyTeamService
  ) { }

  ngOnInit() {
    if (this.item && this.item.profession) {
      this.originalTag = this.item.profession; // Сохраняем исходное значение
      this.value = this.item.profession; // Устанавливаем текущий тег
    }
  }


  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  isEdit: boolean = false;
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
    if (tags.length > 0) {
      this.value = tags[0]; // Устанавливаем новый тег
    } else {
      this.value = null; // Если тег сняли, обнуляем
    }

    this.isEdit = this.originalTag !== this.value; // Проверяем изменение тега
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



  updateProfession() {
    if (!this.isEdit || !this.value) return; // Если изменений нет — не отправляем запрос
    let projectData = this.projectService.getCurrentProjectData();
console.log('item',this.item)
    const updatedData = {
      id: this.item.id,
      profession: this.value.name,
      user: this.item.user
    };
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.put(`${environment.apiUrl}/teamMembers/${projectData.id}`, updatedData, { headers })
      .subscribe(
        () => {
          this.originalTag = this.value; // Обновляем оригинальный тег
          this.isEdit = false; // Скрываем кнопку "Изменить"
        },
        error => console.error('Ошибка обновления:', error)
      );
  }


  deleteItem() {

    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.delete(`${environment.apiUrl}/teamMembers/${this.item.id}`, { headers })
      .subscribe(
        () => {
          this.originalTag = this.value; // Обновляем оригинальный тег
          this.isEdit = false; // Скрываем кнопку "Изменить"
          this.myTeamService.loadData();
        },
        error => console.error('Ошибка обновления:', error)
      );
  }


}
