import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInAndOutAnimation } from '@core/animations';
import { IForecastWeather } from 'app/weather/models/forecast-weather.model';
import { WeatherFacade } from 'app/weather/weather.facade';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [fadeInAndOutAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDetailsComponent implements OnInit {
  id$: Observable<string>;
  forecastEntity$: Observable<IForecastWeather>;
  loading$: Observable<boolean>;
  currentDate = new Date();

  constructor(
    private weatherFacade: WeatherFacade,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id$ = this.getRouterParam('id');
    this.forecastEntity$ = this.id$.pipe(
      switchMap((id) => this.weatherFacade.getForecastWeatherEntity$(id))
    );
    this.loading$ = this.weatherFacade.getForecastWeatherLoading$();
  }

  openWeatherList(): void {
    this.router.navigate(['/weather']);
  }

  private getRouterParam(param): Observable<string> {
    return this.activeRoute.paramMap.pipe(
      map((paramMap) => paramMap.get(param))
    );
  }
}
