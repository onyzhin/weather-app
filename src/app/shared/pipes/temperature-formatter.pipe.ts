import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureFormatter',
})
export class TemperatureFormatterPipe implements PipeTransform {
  transform(value: number, unit: string = 'C'): string {
    if (!value || isNaN(value)) {
      return;
    }

    switch (unit) {
      case 'C':
        return `${value.toFixed(1)} °C`;
      case 'F': {
        const temperature = (value * 9) / 5 + 32;
        return `${temperature.toFixed(1)} °F`;
      }
      default:
        return `${value}`;
    }
  }
}
