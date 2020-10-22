import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windFormatter',
})
export class WindFormatterPipe implements PipeTransform {
  transform(value: number): string {
    if (!value || isNaN(value)) {
      return;
    }
    return `${value.toFixed(1)}m/s`;
  }
}
