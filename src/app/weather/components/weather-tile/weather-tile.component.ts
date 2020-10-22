import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IForecastWeatherEntity } from 'app/weather/models/forecast-weather.model';
import { isSameDay } from 'date-fns';

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrls: ['./weather-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTileComponent implements OnInit, OnChanges {
  @Input() forecast: IForecastWeatherEntity;
  currentDate: Date = new Date();
  isSameDayAsCurrent = true;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('forecast' in changes && this.forecast) {
      this.isSameDayAsCurrent = this._isSameDayAsCurrent(this.forecast?.dt_txt);
    }
  }

  private _isSameDayAsCurrent(time: string | Date): boolean {
    return isSameDay(new Date(time), this.currentDate);
  }
}
