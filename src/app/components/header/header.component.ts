import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  openTaskForm: boolean = false;
  openStateManager: boolean = false;
  btnSection: boolean = false;
  @Output() cardSection = new EventEmitter<void>();

  onTaskForm(): void {
    this.openTaskForm = !this.openTaskForm;
  }

  onStateManager(): void {
    this.openStateManager = !this.openStateManager;
  }

  changeSection(): void {
    this.btnSection = !this.btnSection;
    this.cardSection.emit();
  }
}
