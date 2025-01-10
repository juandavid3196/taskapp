import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { State } from 'src/app/models/state.model';
import { StateService } from 'src/app/services/state.service';
import { TaskService } from 'src/app/services/task.service';
import Swal from 'sweetalert2';

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
  states: State[] = [];
  update: boolean = false;
  stateId: string = '';

  constructor(
    private fb: FormBuilder,
    private stateService: StateService,
    private taskService: TaskService
  ) {
    this.stateForm = this.fb.group({
      title: ['', [Validators.required, this.maxLengthValidator(20)]],
    });
  }

  ngOnInit(): void {
    this.getStates();
  }

  getStates(): void {
    this.stateService.getStates().subscribe((response) => {
      this.states = response;
    });
  }
  maxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value && value.length > maxLength ? { maxLength: true } : null;
    };
  }

  verifyStates(state: string): boolean {
    let task: any[] = [];
    this.taskService.getTasks().subscribe((response) => {
      task = response;
    });
    const res = task.find((e) => e.state === state);
    if (res) {
      return true;
    }
    return false;
  }

  closeWindow(event: Event): void {
    event.preventDefault();
    this.onClose();
  }

  onUpdateState(state: State): void {
    this.stateForm.patchValue({
      title: state.title,
    });

    this.update = !this.update;
    this.stateId = state.id;
  }

  onEliminateState(state: State): void {
    if (this.verifyStates(state.title)) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Hay tareas asignadas a este estado',
      });
      return;
    }
    Swal.fire({
      title: '¿Estás seguro?',
      html: `El estado ${state.title} se eliminará de manera permanente.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stateService.deleteState(state.id);
        Swal.fire('Eliminado', 'El estado ha sido eliminado.', 'success');
      }
    });
  }

  cleanVariables(): void {
    this.update = false;
    this.stateForm.patchValue({
      title: '',
    });
    this.stateId = '';
    this.errorMessage = false;
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
        if (this.update) {
          this.stateService.updateState(
            this.stateId,
            this.stateForm.get('title')?.value
          );
        } else {
          this.stateService.addState(this.stateForm.get('title')?.value);
        }
        this.cleanVariables();
      } catch (error) {
        console.error('Error creating state', error);
      }
    } else {
      this.errorMessage = !this.errorMessage;
      return;
    }
  }
}
