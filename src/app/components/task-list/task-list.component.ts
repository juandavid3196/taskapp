import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/models/task.model';
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
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
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
