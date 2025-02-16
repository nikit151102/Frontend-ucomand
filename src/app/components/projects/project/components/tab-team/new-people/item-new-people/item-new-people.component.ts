import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TagSelectorComponent } from '../../../../../../form-components/tag-selector/tag-selector.component';
import { SortetdFilterService } from '../../../../../../home/sortetd-filter/sortetd-filter.service';
import { FormsModule } from '@angular/forms';
import { NewPeopleService } from '../new-people.service';
import { ProjectService } from '../../../../project.service';

@Component({
  selector: 'app-item-new-people',
  standalone: true,
  imports: [CommonModule, TagSelectorComponent, FormsModule],
  templateUrl: './item-new-people.component.html',
  styleUrl: './item-new-people.component.css'
})
export class ItemNewPeopleComponent {
  @Input() item: any;

  tags: any[] = [];

  showTagBlock = false;
  selectedTags: any[] = [];

  constructor(private projectService:ProjectService,  public sortetdFilterService: SortetdFilterService, private newPeopleService: NewPeopleService) { }

  toggleTagBlock(show: boolean) {
    setTimeout(() => {
      this.showTagBlock = show;
    }, 200);
  }

  value: any

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

  setDecline() {
    this.newPeopleService.setNewPeopleDecline(this.item.id).subscribe((value: any) => {
      console.log("value", value);
    })
  }

  setApplication(){
    let dataProject = this.projectService.getCurrentProjectData();
    this.newPeopleService.setApplication(dataProject.id, this.item.id).subscribe((value: any) => {
      console.log("value", value);
    })
  }  

}
