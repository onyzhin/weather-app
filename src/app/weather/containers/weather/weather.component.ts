import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAndOutAnimation } from '@core/animations';
import { ICurrentWeather } from 'app/weather/models/current-weather.model';
import { WeatherFacade } from 'app/weather/weather.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  animations: [fadeInAndOutAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  weatherEntities$: Observable<ICurrentWeather[]>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(private weatherFacade: WeatherFacade, private router: Router) {}

  ngOnInit(): void {
    this.weatherEntities$ = this.weatherFacade.getCurrentWeatherEntities$();
    this.loading$ = this.weatherFacade.getCurrentWeatherLoading$();
    this.error$ = this.weatherFacade.getCurrentWeatherError$();
  }

  openWeatherDetails(id): void {
    this.router.navigate(['/weather', id]);
  }
}
