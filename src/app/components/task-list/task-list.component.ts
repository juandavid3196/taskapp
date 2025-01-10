import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { StateService } from 'src/app/services/state.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  openActionsMenu: boolean = false;
  tasks: Task[] = [];
  taskSelected?: Task;
  @Output() openTaskForm = new EventEmitter<void>();
  states: string[] = [];
  taskFilterState: string = '';

  constructor(
    private taskService: TaskService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getTasks();
    this.getStates();
  }

  getStates(): void {
    this.states = ['Todos', 'Pendiente', 'En progreso', 'Finalizado'];
    this.stateService.getStates().subscribe((response) => {
      response.map((state) => {
        this.states.push(state.title);
      });
    });
  }

  nextState(state: string): string {
    const index = this.states.findIndex((e) => e === state);
    if (index) {
      if (index < this.states.length - 1) {
        return this.states[index + 1];
      }
    }
    return '';
  }

  changeState(id: string, state: string): void {
    this.taskService.updateState(id, state);
    this.openActionsMenu = false;
  }

  filterColor(state: string): string {
    switch (state) {
      case 'Pendiente':
        return '#7487eb';
        break;
      case 'En progreso':
        return '#fe7e21';
        break;
      case 'Finalizado':
        return '#48d0d0';
        break;

      default:
        return 'rgb(154 204 255)';
        break;
    }
  }

  filterColorNext(state: string): string {
    switch (state) {
      case 'Pendiente':
        return '#fe7e21';
        break;
      case 'En progreso':
        return '#48d0d0';
        break;
      case 'Finalizado':
        return 'rgb(154 204 255)';
        break;

      default:
        return 'rgb(154 204 255)';
        break;
    }
  }

  setFilterState(state: string): void {
    this.taskFilterState = state;
  }

  onEliminateTask(task: Task): void {
    this.openActionsMenu = !this.openActionsMenu;
    Swal.fire({
      title: '¿Estás seguro?',
      html: `El tarea se eliminará de manera permanente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task.id);
        Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
      }
    });
  }

  onUpdate(task: Task): void {
    this.openActionsMenu = !this.openActionsMenu;
    this.openTaskForm.emit();
    this.taskService.setTasktoUpdate(task);
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((response) => {
      this.tasks = response;
    });
  }

  onActionsMenu(task: Task): void {
    this.taskSelected = task;
    this.openActionsMenu = !this.openActionsMenu;
  }
}
