import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskFilter',
})
export class TaskFilterPipe implements PipeTransform {
  transform(tasks: any[], state: string): any[] {
    if (!tasks || !state) {
      return tasks;
    }
    return tasks.filter((task) => task.state === state);
  }
}
