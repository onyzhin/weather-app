import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IForecastWeather } from 'app/weather/models/forecast-weather.model';

@Component({
  selector: 'app-weather-timeline',
  templateUrl: './weather-timeline.component.html',
  styleUrls: ['./weather-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherTimelineComponent implements OnInit {
  @Input() timeline: IForecastWeather[];

  constructor() {}

  ngOnInit(): void {}
}
