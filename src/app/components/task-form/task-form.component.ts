import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  close: boolean = false;
  errorMessage: boolean = false;
  @Output() formClose = new EventEmitter<void>();
  @Input() update?: boolean;
  taskForm: FormGroup;
  taskId: string = '';

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, this.maxLengthValidator(80)]],
    });
  }

  ngOnInit(): void {
    console.log(this.update);
    this.checkUptade();
  }

  checkUptade(): void {
    if (this.update) {
      this.onUpdateTask(this.taskService.getTasktoUpdate());
    }
  }

  maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value.length > maxLength ? { maxLength: true } : null;
    };
  }

  getCurrentDate(): string {
    const date = new Date();

    // Lista de días y meses en español
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const dayName = days[date.getDay()]; // Nombre del día
    const day = date.getDate(); // Día del mes
    const monthName = months[date.getMonth()]; // Nombre del mes
    const year = date.getFullYear(); // Año

    return `${dayName}, ${day} de ${monthName} de ${year}`;
  }

  closeWindow(event: Event): void {
    event.preventDefault();
    this.onClose();
  }

  onClose(): void {
    this.close = true;
    setTimeout(() => {
      this.formClose.emit();
    }, 500);
  }

  cleanVariables(): void {
    this.update = false;
    this.taskForm.patchValue({
      title: '',
    });
    this.taskId = '';
    this.errorMessage = false;
  }

  onUpdateTask(task: Task): void {
    this.taskId = task.id;
    this.taskForm.patchValue({
      title: task.title,
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      try {
        if (this.update) {
          this.taskService.updateTask(
            this.taskId,
            this.taskForm.get('title')?.value
          );
        } else {
          this.taskService.addTask(this.taskForm.get('title')?.value);
        }
        this.cleanVariables();
      } catch (error) {
        console.error('Error creating task', error);
      } finally {
        this.onClose();
      }
    } else {
      this.errorMessage = !this.errorMessage;
      return;
    }
  }
}
