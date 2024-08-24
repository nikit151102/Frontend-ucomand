import { Component, OnInit } from '@angular/core';
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
import { OneSectionComponent } from './one-section/one-section.component';

interface Vacancy {
    id: number;
    title: string;
    context: string;
    skills: string[];
    motivations: string[];
    lastName: string;
    firstName: string;
    floor: string; // 'male' или 'female'
    date: string;
    description: string; 
    contextLevel: string; 
}

interface Resume {
    id: number;
    specialization: string;
    skills: string[];
    motivations: string[];
    lastName: string;
    firstName: string;
    floor: string; // 'male' или 'female'
    date: string;
    description: string; 
    contextLevel: string; 
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, OneSectionComponent, BackgroundImgsComponent, SearchComponent, CardVacancyComponent, SortetdFilterComponent, CardResumeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

    constructor(private viewCardService: ViewCardService, private settingHeaderService: SettingHeaderService, private router: Router, public homeService: HomeService) {
        this.settingHeaderService.post = false;
        this.settingHeaderService.shared = false;
        this.settingHeaderService.backbtn = false;
    }

    vacanciesData: Vacancy[] = [
        {
            id: 1,
            title: 'Backend разработчик',
            context: 'Компания-стартап ищет опытного разработчика backend для создания и поддержки серверной части веб-приложений.',
            skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов'],
            motivations: ['За долю', 'За оплату', 'Практика'],
            lastName: 'Иванов',
            firstName: 'Павел',
            floor: 'male',
            date: '2024.06.29',
            description: 'Мы ищем талантливого backend разработчика для стартапа, который будет заниматься созданием и поддержкой серверной части веб-приложений. Вам предстоит работать с современными технологиями и помогать в построении архитектуры микросервисов.',
            contextLevel: 'Senior'
        },
        {
            id: 2,
            title: 'Frontend разработчик',
            context: 'Крупная IT-компания ищет креативного и ответственного разработчика frontend для создания пользовательских интерфейсов.',
            skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Петрова',
            firstName: 'Елена',
            floor: 'female',
            date: '2024.06.29',
            description: 'Ищем frontend разработчика для создания привлекательных и удобных пользовательских интерфейсов. Вам предстоит работать над интересными проектами в крупной IT-компании, где ценится креативность и внимание к деталям.',
            contextLevel: 'Middle'
        },
        {
            id: 3,
            title: 'Тестировщик ПО',
            context: 'Компания, разрабатывающая программное обеспечение для автоматизации бизнес-процессов, ищет тестировщика для проверки качества ПО.',
            skills: ['Тестирование программного обеспечения', 'Автоматизация тестирования', 'Написание тестовых сценариев'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Смирнов',
            firstName: 'Игорь',
            floor: 'male',
            date: '2024.06.29',
            description: 'Нужен тестировщик ПО для обеспечения качества нашего ПО. Вам предстоит тестировать различные аспекты программного обеспечения, автоматизировать тесты и создавать тестовые сценарии для повышения надежности продуктов.',
            contextLevel: 'Middle'
        },
        {
            id: 4,
            title: 'UX/UI дизайнер',
            context: 'Компания, специализирующаяся на разработке мобильных приложений, ищет UX/UI дизайнера для создания привлекательных и удобных интерфейсов.',
            skills: ['Прототипирование', 'Исследование пользовательских потребностей', 'Adobe XD', 'Sketch'],
            motivations: ['За долю', 'За оплату'],
            lastName: 'Козлова',
            firstName: 'Анастасия',
            floor: 'female',
            date: '2024.06.29',
            description: 'Мы ищем UX/UI дизайнера для работы над дизайном мобильных приложений. Ваша задача — создавать интерфейсы, которые будут не только красивыми, но и удобными для пользователей. Опыт работы в прототипировании и использовании инструментов, таких как Adobe XD и Sketch, необходим.',
            contextLevel: 'Middle'
        },
        {
            id: 5,
            title: 'DevOps инженер',
            context: 'Компания, занимающаяся разработкой и поддержкой высоконагруженных веб-сервисов, ищет DevOps инженера для автоматизации процессов развертывания и мониторинга.',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'AWS/GCP/Azure'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Белов',
            firstName: 'Александр',
            floor: 'male',
            date: '2024.06.29',
            description: 'Ищем DevOps инженера для работы над автоматизацией развертывания и мониторинга веб-сервисов. Важно иметь опыт работы с Docker, Kubernetes, CI/CD и облачными платформами. Мы предлагаем интересные проекты и возможности для профессионального роста.',
            contextLevel: 'Senior'
        },
        {
            id: 6,
            title: 'Data Scientist',
            context: 'Инновационная компания, работающая с большими данными и машинным обучением, ищет Data Scientist для анализа и моделирования данных.',
            skills: ['Python', 'Machine Learning', 'Big Data', 'SQL/NoSQL', 'Статистический анализ'],
            motivations: ['За долю', 'За оплату'],
            lastName: 'Григорьева',
            firstName: 'Ольга',
            floor: 'female',
            date: '2024.06.29',
            description: 'Мы ищем Data Scientist для анализа больших объемов данных и создания моделей машинного обучения. Вам предстоит работать с Python и инструментами анализа данных для решения сложных задач и разработки инновационных решений.',
            contextLevel: 'Senior'
        },
        {
            id: 7,
            title: 'IT Project Manager',
            context: 'Крупная компания ищет опытного IT Project Manager для управления разработкой программного обеспечения и информационных технологий.',
            skills: ['Управление проектами', 'Scrum/Kanban', 'Бюджетирование', 'Управление рисками'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Михайлов',
            firstName: 'Сергей',
            floor: 'male',
            date: '2024.06.29',
            description: 'Нужен опытный IT Project Manager для управления проектами в области разработки ПО. Ваши задачи будут включать планирование, управление бюджетом и рисками, а также координацию работы команды.',
            contextLevel: 'Senior'
        },
        {
            id: 8,
            title: 'Системный администратор',
            context: 'Компания, обеспечивающая инфраструктуру для малого и среднего бизнеса, ищет системного администратора для поддержки серверов и сетевой инфраструктуры.',
            skills: ['Linux/Windows Server', 'Сетевые технологии', 'Администрирование Active Directory'],
            motivations: ['За долю', 'За оплату'],
            lastName: 'Никитин',
            firstName: 'Дмитрий',
            floor: 'male',
            date: '2024.06.29',
            description: 'Ищем системного администратора для поддержки серверов и сетевой инфраструктуры. Важен опыт работы с Linux/Windows Server, сетевыми технологиями и администрированием Active Directory.',
            contextLevel: 'Middle'
        },
        {
            id: 9,
            title: 'Android разработчик',
            context: 'Стартап, разрабатывающий мобильные приложения, ищет Android разработчика для создания инновационных решений на платформе Android.',
            skills: ['Java/Kotlin', 'Android SDK', 'REST API', 'Адаптивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Семенов',
            firstName: 'Иван',
            floor: 'male',
            date: '2024.06.29',
            description: 'Мы ищем Android разработчика для создания мобильных приложений на платформе Android. Если у вас есть опыт работы с Java/Kotlin и Android SDK, а также интерес к инновационным проектам, мы будем рады вас видеть в нашей команде.',
            contextLevel: 'Middle'
        },
        {
            id: 10,
            title: 'iOS разработчик',
            context: 'Компания, специализирующаяся на разработке приложений для iOS, ищет опытного iOS разработчика для создания высококачественных мобильных приложений.',
            skills: ['Swift', 'iOS SDK', 'Xcode', 'Core Data'],
            motivations: ['За долю', 'За оплату'],
            lastName: 'Кузнецова',
            firstName: 'Анна',
            floor: 'female',
            date: '2024.06.29',
            description: 'Ищем iOS разработчика для создания высококачественных мобильных приложений на платформе iOS. Важен опыт работы со Swift, iOS SDK и Xcode. Вы будете работать над инновационными проектами и разрабатывать приложения для широкой аудитории.',
            contextLevel: 'Senior'
        },
        {
            id: 11,
            title: 'UI дизайнер',
            context: 'Компания, специализирующаяся на разработке пользовательских интерфейсов для веб-приложений, ищет UI дизайнера для создания уникальных и креативных дизайн-концепций.',
            skills: ['Adobe Illustrator', 'Photoshop', 'Прототипирование', 'Интерактивный дизайн'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Иванов',
            firstName: 'Даниил',
            floor: 'male',
            date: '2024.06.29',
            description: 'Ищем UI дизайнера для создания уникальных и креативных интерфейсов для веб-приложений. Важно иметь опыт работы с Adobe Illustrator, Photoshop и в создании интерактивного дизайна.',
            contextLevel: 'Junior'
        },
        {
            id: 12,
            title: 'IT Security Specialist',
            context: 'Компания, занимающаяся разработкой информационных систем, ищет специалиста по информационной безопасности для защиты данных и сетевых ресурсов.',
            skills: ['Безопасность информации', 'Сетевые протоколы', 'Угрозы и уязвимости', 'Penetration testing'],
            motivations: ['За долю', 'За оплату'],
            lastName: 'Попова',
            firstName: 'Екатерина',
            floor: 'female',
            date: '2024.06.29',
            description: 'Ищем специалиста по информационной безопасности для защиты данных и сетевых ресурсов нашей компании. Важен опыт работы с сетевыми протоколами, угрозами и уязвимостями, а также проведение тестирования на проникновение.',
            contextLevel: 'Middle'
        },
        {
            id: 13,
            title: 'Full Stack разработчик',
            context: 'Инновационная IT-компания ищет Full Stack разработчика для создания полноценных веб-приложений от концепции до внедрения.',
            skills: ['Node.js', 'React.js', 'MongoDB', 'HTML5', 'CSS3', 'REST API'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Макаров',
            firstName: 'Артем',
            floor: 'male',
            date: '2024.06.29',
            description: 'Мы ищем Full Stack разработчика для создания и поддержки веб-приложений. Важно иметь опыт работы как с frontend, так и с backend технологиями, а также желание участвовать в разработке инновационных решений.',
            contextLevel: 'Middle'
        }
    ];


    resumesData: Resume[] = [
        {
            id: 1,
            specialization: 'Backend разработчик',
            skills: ['Node.js', 'Express.js', 'MongoDB', 'REST API', 'Архитектура микросервисов', 'Тестирование программного обеспечения'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Смирнов',
            firstName: 'Алексей',
            floor: 'male',
            date: '2024.06.29',
            description: 'Опытный backend разработчик с глубокими знаниями Node.js и MongoDB. Имею опыт работы с микросервисной архитектурой и проведением тестирования ПО. Интересует работа в динамичном стартапе или крупной компании.',
            contextLevel: 'Senior'
        },
        {
            id: 2,
            specialization: 'Frontend разработчик',
            skills: ['JavaScript', 'React.js', 'Redux', 'HTML5', 'CSS3', 'Адаптивная верстка'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Иванова',
            firstName: 'Мария',
            floor: 'female',
            date: '2024.06.30',
            description: 'Frontend разработчик с опытом работы с React.js и Redux. Умею создавать адаптивные интерфейсы и работать с современными веб-технологиями. Ищу возможность применять свои навыки в интересных проектах.',
            contextLevel: 'Middle'
        },
        {
            id: 3,
            specialization: 'Data Scientist',
            skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization'],
            motivations: ['За оплату'],
            lastName: 'Кузнецов',
            firstName: 'Илья',
            floor: 'male',
            date: '2024.07.01',
            description: 'Data Scientist с сильным опытом в анализе данных и машинном обучении. Знание Python, Pandas и NumPy позволяет эффективно работать с большими данными и визуализировать результаты. Ищу работу в компании, ориентированной на данные и инновации.',
            contextLevel: 'Middle'
        },
        {
            id: 4,
            specialization: 'Mobile Developer',
            skills: ['Swift', 'Objective-C', 'iOS Development', 'UI/UX Design'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Алексеева',
            firstName: 'Виктория',
            floor: 'female',
            date: '2024.07.02',
            description: 'Мобильный разработчик с опытом создания приложений для iOS. Знание Swift и Objective-C позволяет разрабатывать высококачественные приложения с уникальным дизайном и удобным интерфейсом. Интересуюсь проектами, связанными с мобильными технологиями.',
            contextLevel: 'Senior'
        },
        {
            id: 5,
            specialization: 'DevOps Engineer',
            skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Ansible'],
            motivations: ['За оплату'],
            lastName: 'Соколов',
            firstName: 'Андрей',
            floor: 'male',
            date: '2024.07.03',
            description: 'DevOps инженер с опытом работы с Docker, Kubernetes и CI/CD процессами. Знание AWS и Ansible помогает эффективно управлять инфраструктурой и автоматизировать процессы развертывания. Ищу возможность применения своих навыков в крупной компании.',
            contextLevel: 'Senior'
        },
        {
            id: 6,
            specialization: 'UX/UI Designer',
            skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
            motivations: ['За оплату'],
            lastName: 'Морозова',
            firstName: 'Ольга',
            floor: 'female',
            date: '2024.07.04',
            description: 'UX/UI дизайнер с опытом работы в Figma и Sketch. Специализируюсь на исследовании пользовательских потребностей и создании прототипов. Ищу работу, где смогу применить свои навыки для создания интуитивно понятных и эстетически приятных интерфейсов.',
            contextLevel: 'Middle'
        },
        {
            id: 7,
            specialization: 'Project Manager',
            skills: ['Agile', 'Scrum', 'Kanban', 'Project Planning', 'Team Leadership'],
            motivations: ['За оплату'],
            lastName: 'Петров',
            firstName: 'Алексей',
            floor: 'male',
            date: '2024.07.05',
            description: 'Project Manager с опытом работы в методологиях Agile, Scrum и Kanban. Умею планировать проекты и руководить командами, обеспечивая успешное выполнение задач. Ищу возможность применения своего опыта в динамичных проектах.',
            contextLevel: 'Senior'
        },
        {
            id: 8,
            specialization: 'QA Engineer',
            skills: ['Manual Testing', 'Automated Testing', 'Selenium', 'JIRA', 'Bug Tracking'],
            motivations: ['За оплату'],
            lastName: 'Волков',
            firstName: 'Михаил',
            floor: 'male',
            date: '2024.07.06',
            description: 'QA Engineer с опытом ручного и автоматизированного тестирования. Знание Selenium и JIRA помогает эффективно выявлять и отслеживать ошибки. Ищу работу в компании, где могу участвовать в обеспечении высокого качества ПО.',
            contextLevel: 'Middle'
        },
        {
            id: 9,
            specialization: 'System Administrator',
            skills: ['Linux', 'Windows Server', 'Network Security', 'Virtualization', 'Backup and Recovery'],
            motivations: ['За оплату'],
            lastName: 'Новиков',
            firstName: 'Дмитрий',
            floor: 'male',
            date: '2024.07.07',
            description: 'Системный администратор с опытом работы с Linux и Windows Server. Специализируюсь на сетевой безопасности, виртуализации и резервном копировании. Ищу работу, где смогу поддерживать и улучшать ИТ-инфраструктуру.',
            contextLevel: 'Middle'
        },
        {
            id: 10,
            specialization: 'Database Administrator',
            skills: ['SQL', 'Oracle', 'MySQL', 'Database Design', 'Performance Tuning'],
            motivations: ['За оплату'],
            lastName: 'Фёдоров',
            firstName: 'Сергей',
            floor: 'male',
            date: '2024.07.08',
            description: 'Database Administrator с опытом работы с SQL, Oracle и MySQL. Умею проектировать базы данных и оптимизировать их производительность. Ищу работу, где смогу применять свои навыки для управления и улучшения баз данных.',
            contextLevel: 'Middle'
        },
        {
            id: 11,
            specialization: 'Full Stack Developer',
            skills: ['JavaScript', 'Node.js', 'React.js', 'MongoDB', 'REST API'],
            motivations: ['За оплату', 'Практика'],
            lastName: 'Павлова',
            firstName: 'Наталья',
            floor: 'female',
            date: '2024.07.09',
            description: 'Full Stack Developer с опытом работы как в frontend, так и в backend разработке. Знание JavaScript, Node.js и React.js позволяет создавать полнофункциональные веб-приложения. Ищу возможность работать над интересными проектами.',
            contextLevel: 'Middle'
        },
        {
            id: 12,
            specialization: 'Cybersecurity Specialist',
            skills: ['Network Security', 'Penetration Testing', 'Encryption', 'Firewalls', 'Incident Response'],
            motivations: ['За оплату'],
            lastName: 'Михайлов',
            firstName: 'Роман',
            floor: 'male',
            date: '2024.07.10',
            description: 'Специалист по информационной безопасности с опытом работы в защите сетей и проведении тестов на проникновение. Знание шифрования и работы с фаерволами помогает защищать данные от угроз. Ищу работу в области кибербезопасности.',
            contextLevel: 'Senior'
        },
        {
            id: 13,
            specialization: 'Cloud Architect',
            skills: ['AWS', 'Azure', 'Google Cloud', 'Cloud Security', 'Infrastructure as Code'],
            motivations: ['За оплату'],
            lastName: 'Васильева',
            firstName: 'Анастасия',
            floor: 'female',
            date: '2024.07.11',
            description: 'Cloud Architect с опытом работы с AWS, Azure и Google Cloud. Специализируюсь на облачной безопасности и инфраструктуре как коде. Ищу возможность разработки облачных решений и оптимизации инфраструктуры.',
            contextLevel: 'Senior'
        },
        {
            id: 14,
            specialization: 'Product Manager',
            skills: ['Product Lifecycle Management', 'Market Research', 'Roadmap Planning', 'User Testing'],
            motivations: ['За оплату'],
            lastName: 'Семенов',
            firstName: 'Владимир',
            floor: 'male',
            date: '2024.07.12',
            description: 'Product Manager с опытом управления жизненным циклом продукта, исследования рынка и планирования дорожных карт. Способен организовывать тестирование продуктов и координировать команды. Ищу работу для реализации инновационных идей.',
            contextLevel: 'Senior'
        },
        {
            id: 15,
            specialization: 'Business Analyst',
            skills: ['Requirements Gathering', 'Process Improvement', 'Data Analysis', 'Stakeholder Management'],
            motivations: ['За оплату'],
            lastName: 'Громова',
            firstName: 'Елена',
            floor: 'female',
            date: '2024.07.13',
            description: 'Business Analyst с опытом сбора требований, улучшения процессов и анализа данных. Способна управлять заинтересованными сторонами и предлагать эффективные решения. Ищу возможность применить свои аналитические навыки в бизнесе.',
            contextLevel: 'Middle'
        },
        {
            id: 16,
            specialization: 'Network Engineer',
            skills: ['Cisco', 'Routing and Switching', 'Network Design', 'Wireless Networks', 'Network Security'],
            motivations: ['За оплату'],
            lastName: 'Дмитриев',
            firstName: 'Антон',
            floor: 'male',
            date: '2024.07.14',
            description: 'Network Engineer с опытом работы с Cisco и проектирования сетей. Специализируюсь на маршрутизации, коммутировании и безопасности сетей. Ищу работу, где смогу обеспечить надежную и эффективную сеть.',
            contextLevel: 'Senior'
        },
        {
            id: 17,
            specialization: 'Embedded Systems Engineer',
            skills: ['C/C++', 'RTOS', 'Microcontrollers', 'Hardware Design', 'Debugging'],
            motivations: ['За оплату'],
            lastName: 'Гордеева',
            firstName: 'Анна',
            floor: 'female',
            date: '2024.07.15',
            description: 'Embedded Systems Engineer с опытом работы в C/C++ и разработке встроенных систем. Знание RTOS и микроконтроллеров позволяет создавать эффективные аппаратные решения. Ищу проект, связанный с встраиваемыми системами.',
            contextLevel: 'Middle'
        },
        {
            id: 18,
            specialization: 'AI/ML Engineer',
            skills: ['Python', 'TensorFlow', 'Keras', 'Machine Learning', 'Deep Learning'],
            motivations: ['За оплату'],
            lastName: 'Фролов',
            firstName: 'Алексей',
            floor: 'male',
            date: '2024.07.16',
            description: 'AI/ML Engineer с опытом работы в Python и библиотек для машинного обучения, таких как TensorFlow и Keras. Специализируюсь на глубоких нейронных сетях и поиске решений для сложных задач. Ищу работу, связанную с ИИ и машинным обучением.',
            contextLevel: 'Middle'
        },
        {
            id: 19,
            specialization: 'Game Developer',
            skills: ['Unity', 'C#', 'Game Design', '3D Modeling', 'Animation'],
            motivations: ['За оплату'],
            lastName: 'Савельев',
            firstName: 'Николай',
            floor: 'male',
            date: '2024.07.17',
            description: 'Game Developer с опытом работы в Unity и C#. Создаю увлекательные игры с 3D моделированием и анимацией. Ищу работу, где смогу применять свои навыки для разработки инновационных игр.',
            contextLevel: 'Junior'
        }
    ];
    


    viewCard(cardValue: any, type: string, route: string) {
        this.viewCardService.selectedCard = cardValue;
        this.viewCardService.typeCard = type;
        localStorage.setItem('routeTypeCard', type);
        this.router.navigate([`/${route}`, cardValue]);
    
    }


}
