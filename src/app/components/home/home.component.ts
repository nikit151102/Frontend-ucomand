import { Component } from '@angular/core';
import { CardVacancyComponent } from '../card-vacancy/card-vacancy.component';
import { CommonModule } from '@angular/common';
import { BackgroundImgsComponent } from '../background-imgs/background-imgs.component';
import { SearchComponent } from './search/search.component';
import { SortetdFilterComponent } from './sortetd-filter/sortetd-filter.component';
import { ViewCardService } from '../view-card/view-card.service';
import { Router } from '@angular/router';
import { SettingHeaderService } from '../setting-header.service';
import { CardResumeComponent } from '../card-resume/card-resume.component';
import { HomeService } from './home.service';


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, BackgroundImgsComponent, SearchComponent, CardVacancyComponent, SortetdFilterComponent, CardResumeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private viewCardService: ViewCardService, private settingHeaderService: SettingHeaderService, private router: Router, public homeService: HomeService) {
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
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 2,
            title: 'Frontend разработчик',
            context: 'Крупная IT-компания ищет креативного и ответственного разработчика frontend для создания пользовательских интерфейсов.',
            skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Петрова Елена Александровна',
            floor: 'female',
            date: '2024-06-29'
        },
        {
            id: 3,
            title: 'Тестировщик ПО',
            context: 'Компания, разрабатывающая программное обеспечение для автоматизации бизнес-процессов, ищет тестировщика для проверки качества ПО.',
            skills: ['Тестирование программного обеспечения', 'Автоматизация тестирования', 'Написание тестовых сценариев'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Смирнов Игорь Викторович',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 4,
            title: 'UX/UI дизайнер',
            context: 'Компания, специализирующаяся на разработке мобильных приложений, ищет UX/UI дизайнера для создания привлекательных и удобных интерфейсов.',
            skills: ['Прототипирование', 'Исследование пользовательских потребностей', 'Adobe XD', 'Sketch'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Козлова Анастасия Дмитриевна',
            floor: 'female',
            date: '2024-06-29'
        },
        {
            id: 5,
            title: 'DevOps инженер',
            context: 'Компания, занимающаяся разработкой и поддержкой высоконагруженных веб-сервисов, ищет DevOps инженера для автоматизации процессов развертывания и мониторинга.',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'AWS/GCP/Azure'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Белов Александр Владимирович',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 6,
            title: 'Data Scientist',
            context: 'Инновационная компания, работающая с большими данными и машинным обучением, ищет Data Scientist для анализа и моделирования данных.',
            skills: ['Python', 'Machine Learning', 'Big Data', 'SQL/NoSQL', 'Статистический анализ'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Григорьева Ольга Игоревна',
            floor: 'female',
            date: '2024-06-29'
        },
        {
            id: 7,
            title: 'IT Project Manager',
            context: 'Крупная компания ищет опытного IT Project Manager для управления разработкой программного обеспечения и информационных технологий.',
            skills: ['Управление проектами', 'Scrum/Kanban', 'Бюджетирование', 'Управление рисками'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Михайлов Сергей Андреевич',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 8,
            title: 'Системный администратор',
            context: 'Компания, обеспечивающая инфраструктуру для малого и среднего бизнеса, ищет системного администратора для поддержки серверов и сетевой инфраструктуры.',
            skills: ['Linux/Windows Server', 'Сетевые технологии', 'Администрирование Active Directory'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Никитин Дмитрий Алексеевич',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 9,
            title: 'Android разработчик',
            context: 'Стартап, разрабатывающий мобильные приложения, ищет Android разработчика для создания инновационных решений на платформе Android.',
            skills: ['Java/Kotlin', 'Android SDK', 'REST API', 'Адаптивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Семенов Иван Петрович',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 10,
            title: 'iOS разработчик',
            context: 'Компания, специализирующаяся на разработке приложений для iOS, ищет опытного iOS разработчика для создания высококачественных мобильных приложений.',
            skills: ['Swift', 'iOS SDK', 'Xcode', 'Core Data'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Кузнецова Анна Васильевна',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 11,
            title: 'UI дизайнер',
            context: 'Компания, специализирующаяся на разработке пользовательских интерфейсов для веб-приложений, ищет UI дизайнера для создания уникальных и креативных дизайн-концепций.',
            skills: ['Adobe Illustrator', 'Photoshop', 'Прототипирование', 'Интерактивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Иванов Даниил Александрович',
            floor: 'male',
            date: '2024-06-29'
        },
        {
            id: 12,
            title: 'IT Security Specialist',
            context: 'Компания, занимающаяся разработкой информационных систем, ищет специалиста по информационной безопасности для защиты данных и сетевых ресурсов.',
            skills: ['Безопасность информации', 'Сетевые протоколы', 'Угрозы и уязвимости', 'Penetration testing'],
            motivations: ['За долю', 'За оплату'],
            fullName: 'Попова Екатерина Сергеевна',
            floor: 'female',
            date: '2024-06-29'
        },
        {
            id: 13,
            title: 'Full Stack разработчик',
            context: 'Инновационная IT-компания ищет Full Stack разработчика для создания полноценных веб-приложений от концепции до внедрения.',
            skills: ['Node.js', 'React.js', 'MongoDB', 'HTML5', 'CSS3', 'REST API'],
            motivations: ['За оплату', 'Практика'],
            fullName: 'Макаров Артем Владимирович',
            floor: 'male',
            date: '2024-06-29'
        }]


        resumesData = [
            {
                id: 1,
                specialization: 'Backend разработчик',
                skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов', 'Тестирование программного обеспечения'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Смирнов Алексей Викторович',
                floor: 'male',
                date: '2024-06-29'
            },
            {
                id: 2,
                specialization: 'Frontend разработчик',
                skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Иванова Мария Сергеевна',
                floor: 'female',
                date: '2024-06-30'
            },
            {
                id: 3,
                specialization: 'Data Scientist',
                skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Кузнецов Илья Михайлович',
                floor: 'male',
                date: '2024-07-01'
            },
            {
                id: 4,
                specialization: 'Mobile Developer',
                skills: ['Swift', 'Objective-C', 'iOS Development', 'UI/UX Design'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Алексеева Виктория Ивановна',
                floor: 'female',
                date: '2024-07-02'
            },
            {
                id: 5,
                specialization: 'DevOps Engineer',
                skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Ansible'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Соколов Андрей Дмитриевич',
                floor: 'male',
                date: '2024-07-03'
            },
            {
                id: 6,
                specialization: 'UX/UI Designer',
                skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
                motivations: ['За оплату', 'Творческая работа'],
                fullName: 'Морозова Ольга Сергеевна',
                floor: 'female',
                date: '2024-07-04'
            },
            {
                id: 7,
                specialization: 'Project Manager',
                skills: ['Agile', 'Scrum', 'Kanban', 'Project Planning', 'Team Leadership'],
                motivations: ['За оплату', 'Карьерный рост'],
                fullName: 'Петров Алексей Иванович',
                floor: 'male',
                date: '2024-07-05'
            },
            {
                id: 8,
                specialization: 'QA Engineer',
                skills: ['Manual Testing', 'Automated Testing', 'Selenium', 'JIRA', 'Bug Tracking'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Волков Михаил Андреевич',
                floor: 'male',
                date: '2024-07-06'
            },
            {
                id: 9,
                specialization: 'System Administrator',
                skills: ['Linux', 'Windows Server', 'Network Security', 'Virtualization', 'Backup and Recovery'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Новиков Дмитрий Сергеевич',
                floor: 'male',
                date: '2024-07-07'
            },
            {
                id: 10,
                specialization: 'Database Administrator',
                skills: ['SQL', 'Oracle', 'MySQL', 'Database Design', 'Performance Tuning'],
                motivations: ['За оплату', 'Карьерный рост'],
                fullName: 'Фёдоров Сергей Михайлович',
                floor: 'male',
                date: '2024-07-08'
            },
            {
                id: 11,
                specialization: 'Full Stack Developer',
                skills: ['JavaScript', 'Node.js', 'React.js', 'MongoDB', 'REST API'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Павлова Наталья Александровна',
                floor: 'female',
                date: '2024-07-09'
            },
            {
                id: 12,
                specialization: 'Cybersecurity Specialist',
                skills: ['Network Security', 'Penetration Testing', 'Encryption', 'Firewalls', 'Incident Response'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Михайлов Роман Евгеньевич',
                floor: 'male',
                date: '2024-07-10'
            },
            {
                id: 13,
                specialization: 'Cloud Architect',
                skills: ['AWS', 'Azure', 'Google Cloud', 'Cloud Security', 'Infrastructure as Code'],
                motivations: ['За оплату', 'Карьерный рост'],
                fullName: 'Васильева Анастасия Дмитриевна',
                floor: 'female',
                date: '2024-07-11'
            },
            {
                id: 14,
                specialization: 'Product Manager',
                skills: ['Product Lifecycle Management', 'Market Research', 'Roadmap Planning', 'User Testing'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Семенов Владимир Викторович',
                floor: 'male',
                date: '2024-07-12'
            },
            {
                id: 15,
                specialization: 'Business Analyst',
                skills: ['Requirements Gathering', 'Process Improvement', 'Data Analysis', 'Stakeholder Management'],
                motivations: ['За оплату', 'Карьерный рост'],
                fullName: 'Громова Елена Сергеевна',
                floor: 'female',
                date: '2024-07-13'
            },
            {
                id: 16,
                specialization: 'Network Engineer',
                skills: ['Cisco', 'Routing and Switching', 'Network Design', 'Wireless Networks', 'Network Security'],
                motivations: ['За оплату', 'Практика'],
                fullName: 'Дмитриев Антон Алексеевич',
                floor: 'male',
                date: '2024-07-14'
            },
            {
                id: 17,
                specialization: 'Embedded Systems Engineer',
                skills: ['C/C++', 'RTOS', 'Microcontrollers', 'Hardware Design', 'Debugging'],
                motivations: ['За оплату', 'Интерес к проекту'],
                fullName: 'Гордеева Анна Михайловна',
                floor: 'female',
                date: '2024-07-15'
            },
            {
                id: 18,
                specialization: 'AI/ML Engineer',
                skills: ['Python', 'TensorFlow', 'Keras', 'Machine Learning', 'Deep Learning'],
                motivations: ['За оплату', 'Карьерный рост'],
                fullName: 'Фролов Алексей Дмитриевич',
                floor: 'male',
                date: '2024-07-16'
            },
            {
                id: 19,
                specialization: 'Game Developer',
                skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Animation'],
                motivations: ['За оплату', 'Творческая работа'],
                fullName: 'Савельев Николай Владимирович',
                floor: 'male',
                date: '2024-07-17'
            }]


    viewCard(cardValue: any) {
        this.viewCardService.selectedCard = cardValue;
        this.viewCardService.typeCard = 'vacancy';
        this.router.navigate([`/vacancy`, cardValue.id]);
    }
}
