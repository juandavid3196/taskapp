import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Component({
  selector: 'app-state-manager',
  templateUrl: './state-manager.component.html',
  styleUrls: ['./state-manager.component.scss'],
})
export class StateManagerComponent {
  close: boolean = false;
  errorMessage: boolean = false;
  @Output() formClose = new EventEmitter<void>();
  stateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stateForm = this.fb.group({
      id: uuidv4(),
      title: ['', Validators.required], // falta limite de campos
      date_creation: this.formatDate(),
    });
  }

  formatDate(): string {
    const date = new Date();
    return format(date, 'dd/MM/yyyy');
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
    if (this.stateForm.valid) {
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
