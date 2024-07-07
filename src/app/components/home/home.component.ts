import { Component } from '@angular/core';
import { CardVacancyComponent } from '../card-vacancy/card-vacancy.component';
import { CommonModule } from '@angular/common';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';
import { SearchComponent } from './search/search.component';
import { SortetdFilterComponent } from './sortetd-filter/sortetd-filter.component';
import { ViewCardService } from '../view-card/view-card.service';
import { Router } from '@angular/router';
import { SettingHeaderService } from '../setting-header.service';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, BackgroundImgsComponent, SearchComponent, CardVacancyComponent, SortetdFilterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private viewCardService: ViewCardService, private settingHeaderService: SettingHeaderService, private router: Router) {
        this.settingHeaderService.post = false;
        this.settingHeaderService.shared = false;
        this.settingHeaderService.backbtn = false;
    }

    vacanciesData = [
        {
            id: 1,
            title: 'Backend разработчик',
            context: 'Компания-стартап ищет опытного разработчика backend для создания и поддержки серверной части веб-приложений.',
            skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов', 'Тестирование программного обеспечения', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов'],
            motivations: ['За долю', 'За оплату', 'Практика'],
            fullName: 'Иванов Павел Сергеевич',
            date: '2024-06-29'
        },
        {
            id: 2,
            title: 'Frontend разработчик',
            context: 'Крупная IT-компания ищет креативного и ответственного разработчика frontend для создания пользовательских интерфейсов.',
            skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Петрова Елена Александровна',
            date: '2024-06-29'
        },
        {
            id: 3,
            title: 'Тестировщик ПО',
            context: 'Компания, разрабатывающая программное обеспечение для автоматизации бизнес-процессов, ищет тестировщика для проверки качества ПО.',
            skills: ['Тестирование программного обеспечения', 'Автоматизация тестирования', 'Написание тестовых сценариев'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Смирнов Игорь Викторович',
            date: '2024-06-29'
        },
        {
            id: 4,
            title: 'UX/UI дизайнер',
            context: 'Компания, специализирующаяся на разработке мобильных приложений, ищет UX/UI дизайнера для создания привлекательных и удобных интерфейсов.',
            skills: ['Прототипирование', 'Исследование пользовательских потребностей', 'Adobe XD', 'Sketch'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Козлова Анастасия Дмитриевна',
            date: '2024-06-29'
        },
        {
            id: 5,
            title: 'DevOps инженер',
            context: 'Компания, занимающаяся разработкой и поддержкой высоконагруженных веб-сервисов, ищет DevOps инженера для автоматизации процессов развертывания и мониторинга.',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'AWS/GCP/Azure'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Белов Александр Владимирович',
            date: '2024-06-29'
        },
        {
            id: 6,
            title: 'Data Scientist',
            context: 'Инновационная компания, работающая с большими данными и машинным обучением, ищет Data Scientist для анализа и моделирования данных.',
            skills: ['Python', 'Machine Learning', 'Big Data', 'SQL/NoSQL', 'Статистический анализ'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Григорьева Ольга Игоревна',
            date: '2024-06-29'
        },
        {
            id: 7,
            title: 'IT Project Manager',
            context: 'Крупная компания ищет опытного IT Project Manager для управления разработкой программного обеспечения и информационных технологий.',
            skills: ['Управление проектами', 'Scrum/Kanban', 'Бюджетирование', 'Управление рисками'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Михайлов Сергей Андреевич',
            date: '2024-06-29'
        },
        {
            id: 8,
            title: 'Системный администратор',
            context: 'Компания, обеспечивающая инфраструктуру для малого и среднего бизнеса, ищет системного администратора для поддержки серверов и сетевой инфраструктуры.',
            skills: ['Linux/Windows Server', 'Сетевые технологии', 'Администрирование Active Directory'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Никитин Дмитрий Алексеевич',
            date: '2024-06-29'
        },
        {
            id: 9,
            title: 'Android разработчик',
            context: 'Стартап, разрабатывающий мобильные приложения, ищет Android разработчика для создания инновационных решений на платформе Android.',
            skills: ['Java/Kotlin', 'Android SDK', 'REST API', 'Адаптивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Семенов Иван Петрович',
            date: '2024-06-29'
        },
        {
            id: 10,
            title: 'iOS разработчик',
            context: 'Компания, специализирующаяся на разработке приложений для iOS, ищет опытного iOS разработчика для создания высококачественных мобильных приложений.',
            skills: ['Swift', 'iOS SDK', 'Xcode', 'Core Data'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Кузнецова Анна Васильевна',
            date: '2024-06-29'
        },
        {
            id: 11,
            title: 'UI дизайнер',
            context: 'Компания, специализирующаяся на разработке пользовательских интерфейсов для веб-приложений, ищет UI дизайнера для создания уникальных и креативных дизайн-концепций.',
            skills: ['Adobe Illustrator', 'Photoshop', 'Прототипирование', 'Интерактивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Иванов Даниил Александрович',
            date: '2024-06-29'
        },
        {
            id: 12,
            title: 'IT Security Specialist',
            context: 'Компания, занимающаяся разработкой информационных систем, ищет специалиста по информационной безопасности для защиты данных и сетевых ресурсов.',
            skills: ['Безопасность информации', 'Сетевые протоколы', 'Угрозы и уязвимости', 'Penetration testing'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Попова Екатерина Сергеевна',
            date: '2024-06-29'
        },
        {
            id: 13,
            title: 'Full Stack разработчик',
            context: 'Инновационная IT-компания ищет Full Stack разработчика для создания полноценных веб-приложений от концепции до внедрения.',
            skills: ['Node.js', 'React.js', 'MongoDB', 'HTML5', 'CSS3', 'REST API'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Макаров Артем Владимирович',
            date: '2024-06-29'
        }]

    viewCard(cardValue: any) {
        this.viewCardService.selectedCard = cardValue;
        this.viewCardService.typeCard = 'vacancy';
        this.router.navigate([`/vacancy`, cardValue.id]);
    }
}
