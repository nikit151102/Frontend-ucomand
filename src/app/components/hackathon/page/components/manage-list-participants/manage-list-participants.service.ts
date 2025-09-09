import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../../environment';

interface Participant {
  id: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ManageListParticipantsService {
  // Инициализация BehaviorSubject
  private newTeamRequests = new BehaviorSubject<Participant[]>([]);
  private newIndividualRequests = new BehaviorSubject<Participant[]>([]);
  private activeIndividuals = new BehaviorSubject<Participant[]>([]);
  private activeTeams = new BehaviorSubject<Participant[]>([]);

  // Observable для подписки
  newTeamRequests$ = this.newTeamRequests.asObservable();
  newIndividualRequests$ = this.newIndividualRequests.asObservable();
  activeIndividuals$ = this.activeIndividuals.asObservable();
  activeTeams$ = this.activeTeams.asObservable();

  constructor(private http: HttpClient) { }

  // ========== Функции для новых заявок команд ==========
  addNewTeamRequest(team: Participant): void {
    const current = this.newTeamRequests.value;
    this.newTeamRequests.next([...current, team]); // Добавляем в массив
  }

  setNewTeamRequests(teams: Participant[]): void {
    this.newTeamRequests.next(teams); // Полная замена массива
  }

  updateNewTeamRequest(id: string, updates: Partial<Participant>): void {
    const current = this.newTeamRequests.value.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    this.newTeamRequests.next(current);
  }

  removeNewTeamRequest(id: string): void {
    const current = this.newTeamRequests.value.filter(t => t.id !== id);
    this.newTeamRequests.next(current);
  }

  // ========== Функции для новых заявок людей ==========
  addNewIndividualRequest(individual: Participant): void {
    const current = this.newIndividualRequests.value;
    this.newIndividualRequests.next([...current, individual]);
  }

  setNewIndividualRequests(individuals: Participant[]): void {
    this.newIndividualRequests.next(individuals);
  }

  updateNewIndividualRequest(id: string, updates: Partial<Participant>): void {
    const current = this.newIndividualRequests.value.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    this.newIndividualRequests.next(current);
  }

  removeNewIndividualRequest(id: string): void {
    const current = this.newIndividualRequests.value.filter(i => i.id !== id);
    this.newIndividualRequests.next(current);
  }

  // ========== Функции для активных людей ==========
  addActiveIndividual(individual: Participant): void {
    const current = this.activeIndividuals.value;
    this.activeIndividuals.next([...current, individual]);
  }

  setActiveIndividuals(individuals: Participant[]): void {
    this.activeIndividuals.next(individuals);
  }

  updateActiveIndividual(id: string, updates: Partial<Participant>): void {
    const current = this.activeIndividuals.value.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    this.activeIndividuals.next(current);
  }

  removeActiveIndividual(id: string): void {
    const current = this.activeIndividuals.value.filter(i => i.id !== id);
    this.activeIndividuals.next(current);
  }

  // ========== Функции для активных команд ==========
  addActiveTeam(team: Participant): void {
    const current = this.activeTeams.value;
    this.activeTeams.next([...current, team]);
  }

  setActiveTeams(teams: Participant[]): void {
    this.activeTeams.next(teams);
  }

  updateActiveTeam(id: string, updates: Partial<Participant>): void {
    const current = this.activeTeams.value.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    this.activeTeams.next(current);
  }

  removeActiveTeam(id: string): void {
    const current = this.activeTeams.value.filter(t => t.id !== id);
    this.activeTeams.next(current);
  }

  // ========== Общие функции ==========
  clearAll(): void {
    this.newTeamRequests.next([]);
    this.newIndividualRequests.next([]);
    this.activeIndividuals.next([]);
    this.activeTeams.next([]);
  }

  // Получение текущего значения без подписки
  getCurrentNewTeamRequests(): Participant[] {
    return this.newTeamRequests.value;
  }

  getCurrentNewIndividualRequests(): Participant[] {
    return this.newIndividualRequests.value;
  }

  getCurrentActiveIndividuals(): Participant[] {
    return this.activeIndividuals.value;
  }

  getCurrentActiveTeams(): Participant[] {
    return this.activeTeams.value;
  }





  getsCommands(id: any) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.apiUrl}/hackathons/${id}/teams?page=0&size=1000`, { headers })

  }

  getsPerson(id: any) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${environment.apiUrl}/hackathons/${id}/participants?page=0&size=1000`, { headers })

  }


}