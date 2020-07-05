import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';

@Pipe({
    name: 'momentPipe',
    pure: false
})
export class MomentPipe implements PipeTransform {
    transform(m: moment.Moment, format: string = 'MMM yyyy'): string {
        return m.format(format)
    }
    
}