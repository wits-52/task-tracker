import { Injectable } from '@angular/core';
import { Task } from '../Task';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UiService {
  private addTaskState: boolean = false;
  private subject = new Subject<any>();

  constructor() { }
  toggleAddTask(): void {
    this.addTaskState = !this.addTaskState;
    this.subject.next(this.addTaskState);
  }
  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
