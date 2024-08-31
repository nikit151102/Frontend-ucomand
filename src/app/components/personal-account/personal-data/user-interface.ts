export interface District {
    id: number;
    name: string | null;
}

export interface Region {
    id: number;
    name: string | null;
    district: District | null;
}

export interface CityOfResidence {
    id: number;
    name: string | null;
    region: Region | null;
}

export interface User {
    id: number;
    firstName: string | null;
    lastName: string | null;
    gender: 'MALE' | 'FEMALE'; // Предположим, что возможно два значения
    age: number | null;
    freeLink: string | null;
    ownLink: string | null;
    aboutMe: string | null;
    email: string | null;
    telegram: string | null;
    dateOfRegistration: string | null; // Можно использовать Date, если требуется работа с датой
    cityOfResidence: CityOfResidence;
    role: 'ROOT' | 'USER' | 'ADMIN'; // Укажите возможные значения для роли
}