import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  openTaskForm: boolean = false;
  openStateManager: boolean = false;

  onTaskForm(): void {
    this.openTaskForm = !this.openTaskForm;
  }

  onStateManager(): void {
    this.openStateManager = !this.openStateManager;
  }
}
