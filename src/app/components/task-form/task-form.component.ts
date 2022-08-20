import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  title!: string;
  dayTime!: string;
  reminder: boolean = false;
  addTaskState: boolean = false;
  subscription: Subscription;
  titleValid: boolean = true;
  dayTimeValid: boolean = true;
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => {
      this.addTaskState = value;
    });
   }

  ngOnInit(): void {
  }
  onSubmit() {
    if(!this.title || !this.dayTime) {
      // TODO: make frontend effects for validation
      !this.title ? this.titleValid = false : this.titleValid = true;
      !this.dayTime ? this.dayTimeValid = false : this.dayTimeValid = true;
      // alert('Please add details');
      return;
    }
    const newTask:Task = {
      title: this.title,
      date: this.dayTime,
      reminder: this.reminder
    };
    this.onAddTask.emit(newTask);

    this.title = '';
    this.dayTime = '';
    this.reminder = false;
  }
}
