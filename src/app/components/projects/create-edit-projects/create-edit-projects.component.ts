import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeProjectComponent } from './type-project/type-project.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEditProjectsService } from './create-edit-projects.service';
import { ProjectService } from '../project/project.service';
import { forbiddenWordsValidator } from '../../../../validators/forbidden-words.validator';

@Component({
  selector: 'app-create-edit-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TypeProjectComponent],
  templateUrl: './create-edit-projects.component.html',
  styleUrl: './create-edit-projects.component.css'
})
export class CreateEditProjectsComponent implements OnInit {

  form!: FormGroup;
  submitAttempted = false;
  isError: boolean = false;
  oldNickname: string = '';
  cancel_btn: boolean = false;
  projectData: any = null;
  constructor(private fb: FormBuilder, private router: Router, private createEditProjectsService: CreateEditProjectsService, public projectService: ProjectService, private route: ActivatedRoute) {

  }
  onTextAreaInput(event: Event, minHeight = 98) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Сбрасываем высоту, чтобы она могла адаптироваться


    // Используем scrollHeight, чтобы установить высоту в зависимости от содержимого
    const newHeight = Math.max(textarea.scrollHeight, minHeight);

    textarea.style.height = `${newHeight}px`; // Устанавливаем высоту в зависимости от содержимого
  }



  ngOnInit(): void {
    this.initializeForm();
    this.projectService.currentProjectData$.subscribe((value: any) => {
      this.projectData = value;
    })
    this.route.data.subscribe((data) => {
      const isEdit = data['edit'];
      if (isEdit) {
        if (this.projectData && this.projectData.nickname) {
          this.ProjectData(this.projectData.nickname);
        } else {
          const paramNickName = this.route.snapshot.paramMap.get('nickname');
          if (paramNickName) {
            this.projectService.getCurrentProject(paramNickName).subscribe(data => {
              this.projectService.setCurrentProjectData(data);
              this.ProjectData(data.nickname);
            });

          }
        }
      }
    });


  }

  onInputChange(event: any) {
    let value = event.target.value;

    // Если поле пустое или первый символ не @, добавляем его
    if (!value.startsWith('@')) {
      value = '@' + value.replace(/^@+/, ''); // Убираем лишние @ в начале
      event.target.value = value; // Обновляем отображение в input
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200), forbiddenWordsValidator()]],
      summary: ['', [Validators.required, Validators.maxLength(300), forbiddenWordsValidator()]],
      type: [, Validators.required],
      email: ['', Validators.required],
      telegram: ['', [Validators.required, forbiddenWordsValidator()]],
      description: ['', [Validators.required, Validators.maxLength(1500), forbiddenWordsValidator()]],
      developmentStage: ['', [Validators.required, Validators.maxLength(1500), forbiddenWordsValidator()]],
      tasks: ['', [Validators.required, Validators.maxLength(1500), forbiddenWordsValidator()]],
      nickname: ['', [Validators.required, forbiddenWordsValidator()]],
    });
  }

  @ViewChild('fileBackgroundInput') fileBackgroundInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileLogoInput') fileLogoInput!: ElementRef<HTMLInputElement>;


  isBackgroundImageSelected = false;
  isLogoImageSelected = false;

  onSelectImage(target: 'background' | 'logo'): void {
    if (target === 'background') {
      this.fileBackgroundInput.nativeElement.click();
    } else if (target === 'logo') {
      this.fileLogoInput.nativeElement.click();
    }
  }
  headerImg: any;
  avatarImg: any;

  // Общая функция для изменения изображения
  onImageChange(event: Event, target: 'background' | 'logo'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const allowedTypes = ['image/png', 'image/jpeg'];

      if (!allowedTypes.includes(file.type)) {
        console.error('Unsupported file type:', file.type);
        alert('Please upload a PNG or JPEG image.');
        return;
      }

      const objectUrl = URL.createObjectURL(file);

      if (target === 'background') {
        const backgroundContainer = document.querySelector('.background-container') as HTMLElement;
        if (backgroundContainer) {
          backgroundContainer.style.backgroundImage = `url(${objectUrl})`;
          backgroundContainer.style.backgroundSize = 'cover';
          backgroundContainer.style.backgroundPosition = 'center';
        }
        console.log('file', file)
        this.headerImg = file;
        this.isLogoImageSelected = true;
      } else if (target === 'logo') {
        const logoContainer = document.querySelector('.container-elements-left-iconBlock-img') as HTMLElement;
        if (logoContainer) {
          logoContainer.style.backgroundImage = `url(${objectUrl})`;
          logoContainer.style.backgroundSize = 'contain';
          logoContainer.style.backgroundRepeat = 'no-repeat';
          logoContainer.style.backgroundPosition = 'center';
        }
        this.avatarImg = file;
        this.isLogoImageSelected = true;
      }

      setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    }
  }


  setAvatar(file: any, endpoint: string): void {
    const formData = new FormData();
    formData.append('avatar', file);

    this.createEditProjectsService.setAvatar(formData, endpoint, this.projectData.id).subscribe({
      next: (response) => {
        console.log('Avatar updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating avatar:', error);
      }
    });
  }

  ProjectData(nicknameProject: string) {
    this.projectService.getCurrentProject(nicknameProject).subscribe(
      (user: any) => {

        this.form.patchValue({
          title: user.title || '',
          summary: user.summary || '',
          type: user.type || '',
          email: user.email || '',
          telegram: user.telegram ? '@' + user.telegram.replace(/^@+/, '') : '',
          description: user.description || '',
          developmentStage: user.developmentStage || '',
          tasks: user.tasks,
          nickname: user.nickname,
        });

        if (user.nickname) {
          this.oldNickname = user.nickname;
        }
        this.form.get('nickname')?.valueChanges.subscribe(value => {
          if (value !== this.oldNickname && value.length > 0) {
            this.forbiddenWordsValidator(value)
          }
        });
        this.formChanges();
      },
      (error: any) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
        console.log('error.status', error)
        if (error.status) {
          this.router.navigate(['/error', error.status.toString()]);
        } else {
          this.router.navigate(['/error', { num: "500" }]);
        }
      }
    );
  }

  formChanges() {
    this.form.valueChanges.subscribe((changes) => {
      if (this.areAllFieldsEmpty()) {
        this.cancel_btn = false;
      }
      else {
        this.cancel_btn = true;
      }
    });
  }

  areAllFieldsEmpty(): boolean {
    return Object.values(this.form.value).every(value => value === '');
  }

  onTagsChanged(tags: any, field: string): void {
    this.form.get(field)?.setValue(tags);
  }

  submitForm(isEdit: boolean): void {
    this.submitAttempted = true;

    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsDirty();
      control?.markAsTouched();
    });

    if (this.form.valid) {
      console.log('Форма отправлена:', this.form.value);

      let data = this.form.value
      let newData: {
        id?: any;
        title: any;
        summary: any;
        type: any;
        email: any;
        telegram: any;
        description: any;
        developmentStage: any;
        tasks: any;
        nickname: any;
      } = {
        'title': data.title,
        'summary': data.summary,
        'type': data.type.type,
        'email': data.email,
        'telegram': data.telegram.startsWith('@') ? data.telegram.slice(1) : data.telegram,
        'description': data.description.replace(/\r?\n/g, '\n'),
        'developmentStage': data.developmentStage.replace(/\r?\n/g, '\n'),
        'tasks': data.tasks.replace(/\r?\n/g, '\n'),
        'nickname': data.nickname,

      };

      if (isEdit) {
        newData.id = this.projectData.id;
        this.createEditProjectsService.setEditProject(newData).subscribe((data: any) => {

          if (this.headerImg) {
            this.setAvatar(this.headerImg, 'header');
          }
          if (this.avatarImg) {
            this.setAvatar(this.headerImg, 'avatar');
          }
          this.projectService.setCurrentProjectData(data);
          // this.router.navigate(['project', data.nickname]);
        })
      } else {
        this.createEditProjectsService.setNewProject(newData).subscribe((data: any) => {

          if (this.headerImg) {
            this.setAvatar(this.headerImg, 'header');
          }
          if (this.avatarImg) {
            this.setAvatar(this.headerImg, 'avatar');
          }
          this.projectService.setCurrentProjectData(data);
          this.router.navigate(['project', data.nickname]);
        })
      }



    } else {
      console.log('Форма содержит ошибки:', this.form.errors);
    }
  }



  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!control?.hasError(error) && (control?.dirty || control?.touched || this.submitAttempted);
  }

  forbiddenWordsValidator(value: string) {
    // this.form.validatorDomain(value.toLowerCase()).subscribe((data: any) => {
    //   if (data === false) {
    //     this.form.get('nickname')?.setErrors({ forbiddenWords: true });
    //   } else {
    //     this.form.get('nickname')?.setErrors(null);
    //   }
    // })
  }

}
