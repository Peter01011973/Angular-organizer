import { Component, OnInit } from '@angular/core';
import * as momemt from 'moment';
import { DateService } from '../sheared/date.service';

interface Day {
  value: momemt.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}

interface Week {
  days: Day[]
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.date$$.subscribe(this.generate.bind(this))
  }

  generate(now: momemt.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');

    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
        .fill(0)
        .map(() => {
          const value = date.add(1, 'day').clone();
          const active = momemt().isSame(value, 'date');
          const disabled = !now.isSame(value, 'month');
          const selected = now.isSame(value, 'day');
          return { value, active, disabled, selected }
        })
      })
    }
    this.calendar = calendar;
  }

  select(day: Day) {
    this.dateService.changeDate(day.value)
  }
}
