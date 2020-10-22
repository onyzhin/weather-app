import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherApiService } from './api/weather-api.service';
import { ForecastWeatherState } from './state/forecast-weather.state';
import { CurrentWeatherState } from './state/current-weather.state';
import { IForecastWeather } from './models/forecast-weather.model';
import {
  ICurrentWeather,
  ICurrentWeatherList,
} from './models/current-weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherFacade {
  constructor(
    private weatherApiService: WeatherApiService,
    private currentWeatherState: CurrentWeatherState,
    private forecastWeatherState: ForecastWeatherState
  ) {}

  getCurrentWeatherEntities$(): Observable<ICurrentWeather[]> {
    return this.currentWeatherState.entities$;
  }

  getCurrentWeatherCitiesList$(): Observable<string[]> {
    return this.currentWeatherState.citiesList$;
  }

  getCurrentWeatherLoading$(): Observable<boolean> {
    return this.currentWeatherState.loading$;
  }

  getCurrentWeatherLoaded$(): Observable<boolean> {
    return this.currentWeatherState.loaded$;
  }

  getCurrentWeatherError$(): Observable<boolean> {
    return this.currentWeatherState.error$;
  }

  getForecastWeatherEntity$(id: string): Observable<IForecastWeather> {
    return this.forecastWeatherState.entities$.pipe(
      map((entities) => entities[id])
    );
  }

  getForecastWeatherLoading$(): Observable<boolean> {
    return this.forecastWeatherState.loading$;
  }

  getForecastWeatherError$(): Observable<boolean> {
    return this.currentWeatherState.error$;
  }

  loadCurrentWeather(idList: string[]): Observable<ICurrentWeatherList> {
    const idListAsString = idList.join(',');
    const observable = this.weatherApiService.getCurrentWeather(idListAsString);
    this.currentWeatherState.setLoading(true);
    observable.subscribe(
      (weatherListData) =>
        this.currentWeatherState.setWeatherState(weatherListData.list),
      () => {
        this.currentWeatherState.setError(true);
        this.currentWeatherState.setLoading(false);
      }
    );

    return observable;
  }

  loadForecastWeatherEntity(id: string): Observable<IForecastWeather> {
    const observable = this.weatherApiService.getForecastWeather(id);
    this.forecastWeatherState.setLoading(true);
    observable.subscribe(
      (forecast) => this.forecastWeatherState.addForecastEntity(forecast),
      () => {
        this.forecastWeatherState.setError(true);
        this.forecastWeatherState.setLoading(false);
      }
    );

    return observable;
  }
}
