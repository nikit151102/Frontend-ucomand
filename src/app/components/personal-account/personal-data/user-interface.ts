export interface District {
    id: number;
    name: string;
}

export interface Region {
    id: number;
    name: string;
    district: District;
}

export interface CityOfResidence {
    id: number;
    name: string;
    region: Region;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    gender: 'MALE' | 'FEMALE'; // Предположим, что возможно два значения
    age: number;
    freeLink: string;
    ownLink: string;
    aboutMe: string;
    email: string;
    telegram: string;
    dateOfRegistration: string; // Можно использовать Date, если требуется работа с датой
    cityOfResidence: CityOfResidence;
    role: 'ROOT' | 'USER' | 'ADMIN'; // Укажите возможные значения для роли
}