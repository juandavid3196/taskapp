import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { StateManagerComponent } from './components/state-manager/state-manager.component';
import { HeaderComponent } from './components/header/header.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskBoardComponent,
    StateManagerComponent,
    HeaderComponent,
    DragAndDropDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
