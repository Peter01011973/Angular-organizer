import { Component, OnInit, HostBinding } from '@angular/core';
import { DateService } from '../sheared/date.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TasksService, Task } from '../sheared/tasks.service';
import { switchMap } from 'rxjs/operators';
import * as momemt from 'moment';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  public formEvents: FormGroup;
  public tasks: Task[] = [];

  constructor(
    public dateService:DateService, 
    private fb: FormBuilder,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this.formEvents = this.fb.group({
      title: ['', Validators.required]
    });
    this.dateService.date$$.pipe(
      switchMap((date: momemt.Moment) => this.tasksService.load(date))
    ).subscribe((tasks: Task[]) => {this.tasks = tasks})
  }

  submit() {
    const {title} = this.formEvents.value;
    const task: Task = {
      title,
      date: this.dateService.date$$.value.format('DD-MM-YYYY') 
    }

    this.tasksService.create(task).subscribe(
      () => {
        this.formEvents.reset();
        this.tasks.push(task);
      },
      (error) => {console.error(error);}
    ); 
  }

  delete(task: Task) {
    this.tasksService.delete(task).subscribe(
      () => {
        console.log('Task has been successfully deleted!');
        this.tasks =this.tasks.filter(item => item.id !== task.id)
      },
      (error) => {console.error(error)}
    )
  }

}
