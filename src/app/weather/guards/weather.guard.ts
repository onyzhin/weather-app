import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { WeatherFacade } from 'app/weather/weather.facade';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherGuard implements CanActivate {
  constructor(private weatherFacade: WeatherFacade) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.weatherFacade.getCurrentWeatherLoaded$().pipe(
      take(1),
      withLatestFrom(this.weatherFacade.getCurrentWeatherCitiesList$()),
      tap(([currentWeatherLoaded, citiesList]) => {
        if (!currentWeatherLoaded) {
          this.weatherFacade.loadCurrentWeather(citiesList);
        }
      }),
      map(() => true)
    );
  }
}
