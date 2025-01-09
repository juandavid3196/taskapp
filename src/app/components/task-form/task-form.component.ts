import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  close: boolean = false;
  errorMessage: boolean = false;
  @Output() formClose = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required], // falta limite de campos
      date_creation: this.formatDate(),
      state: 'Pendiente',
    });
  }

  formatDate(): string {
    const date = new Date();
    return format(date, 'dd/MM/yyyy');
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

  onSubmit(): void {
    if (this.taskForm.valid) {
      try {
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
