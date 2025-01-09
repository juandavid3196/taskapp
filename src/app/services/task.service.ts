import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private storageKey = 'tasks';
  private tasks$: BehaviorSubject<Task[]>;
  private taskToUpdate?: Task;

  constructor() {
    const initialTasks = JSON.parse(
      localStorage.getItem(this.storageKey) || '[]'
    );
    this.tasks$ = new BehaviorSubject<Task[]>(initialTasks);
  }

  formatDate(): string {
    const date = new Date();
    return format(date, 'dd/MM/yyyy');
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }

  addTask(title: string): void {
    const newTask: Task = {
      id: uuidv4(),
      title,
      date_creation: this.formatDate(),
      state: 'Pendiente',
    };
    const updatedTasks = [...this.tasks$.value, newTask];
    this.updateStorage(updatedTasks);
  }

  setTasktoUpdate(task: Task): void {
    this.taskToUpdate = task;
  }

  getTasktoUpdate(): any {
    return this.taskToUpdate;
  }

  updateTask(id: string, title: string): void {
    const updatedTasks = this.tasks$.value.map((task) =>
      task.id === id ? { ...task, title } : task
    );
    this.updateStorage(updatedTasks);
  }

  updateState(id: string, state: string): void {
    const updatedTasks = this.tasks$.value.map((task) =>
      task.id === id ? { ...task, state } : task
    );
    this.updateStorage(updatedTasks);
  }

  deleteTask(id: string): void {
    const updatedTasks = this.tasks$.value.filter((task) => task.id !== id);
    this.updateStorage(updatedTasks);
  }

  private updateStorage(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    this.tasks$.next(tasks);
  }
}
