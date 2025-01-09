import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../models/state.model';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private storageKey = 'states';
  private states$: BehaviorSubject<State[]>;

  constructor() {
    const initialStates = JSON.parse(
      localStorage.getItem(this.storageKey) || '[]'
    );
    this.states$ = new BehaviorSubject<State[]>(initialStates);
  }

  formatDate(): string {
    const date = new Date();
    return format(date, 'dd/MM/yyyy');
  }

  getStates(): Observable<State[]> {
    return this.states$.asObservable();
  }

  addState(title: string): void {
    const newState: State = {
      id: uuidv4(),
      title,
      date_creation: this.formatDate(),
    };
    const updatedStates = [...this.states$.value, newState];
    this.updateStorage(updatedStates);
  }

  updateState(id: string, title: string): void {
    const updatedStates = this.states$.value.map((state) =>
      state.id === id ? { ...state, title } : state
    );
    this.updateStorage(updatedStates);
  }

  deleteState(id: string): void {
    const updatedStates = this.states$.value.filter((state) => state.id !== id);
    this.updateStorage(updatedStates);
  }

  private updateStorage(states: State[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(states));
    this.states$.next(states);
  }
}
