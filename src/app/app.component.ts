import { Component } from '@angular/core';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taskapp';
  openTaskForm: boolean = false;

  onTaskForm(): void {
    this.openTaskForm = !this.openTaskForm;
    console.log(this.openTaskForm);
  }
}
