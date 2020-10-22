import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ICurrentWeather } from 'app/weather/models/current-weather.model';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherListComponent implements OnInit {
  @Input() entities: ICurrentWeather[];
  @Output() openDetails: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  openWeatherDetails({ id }: ICurrentWeather): void {
    this.openDetails.emit(id);
  }
}
