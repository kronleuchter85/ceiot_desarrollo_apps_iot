import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    
    var d = new Date(value);
    var formatedDate = d.toJSON().slice(0, 19).replace('T', ' ');

    return formatedDate;
  }

}
