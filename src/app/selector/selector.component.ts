import { Component } from '@angular/core';
import { DateService } from '../sheared/date.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {
  public date$$: BehaviorSubject<moment.Moment>;

  constructor(public dateService: DateService) { 
    this.date$$ = this.dateService.date$$;
  }

  go(dir: number) {
    this.dateService.changeMonth(dir);
  }

}
