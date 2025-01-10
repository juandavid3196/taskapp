import { Component, EventEmitter, Output } from '@angular/core';
import { State } from 'src/app/models/state.model';
import { Task } from 'src/app/models/task.model';
import { StateService } from 'src/app/services/state.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  openActionsMenu: boolean = false;
  tasks: Task[] = [];
  taskSelected?: Task;
  @Output() openTaskForm = new EventEmitter<void>();
  states: string[] = [];

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

  onDragStart(task: Task): void {
    this.taskSelected = task;
  }

  onDrop(e: any, state: string): void {
    e.preventDefault();

    if (this.nextState(state)) {
      if (this.taskSelected)
        this.taskService.updateState(this.taskSelected?.id, state);
    } else {
      return;
    }
  }

  nextState(state: string): boolean {
    if (!this.taskSelected) return false;

    const indexTaskSelected = this.states.findIndex(
      (e) => e === this.taskSelected?.state
    );
    const index = this.states.findIndex((e) => e === state);

    return (
      indexTaskSelected !== -1 &&
      index !== -1 &&
      indexTaskSelected + 1 === index
    );
  }

  onDragOver(e: any): void {
    e.preventDefault();
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
