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

  constructor(private fb: FormBuilder, private stateService: StateService) {
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
        console.log(this.stateForm.value);
        this.stateService.addState(this.stateForm.get('title')?.value);
      } catch (error) {
        console.error('Error creating task', error);
      }
    } else {
      this.errorMessage = !this.errorMessage;
      return;
    }
  }
}
