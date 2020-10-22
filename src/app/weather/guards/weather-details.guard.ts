import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { WeatherFacade } from 'app/weather/weather.facade';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDetailsGuard implements CanActivate {
  constructor(private weatherFacade: WeatherFacade) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.id).pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<boolean> {
    return this.weatherFacade.getForecastWeatherEntity$(id).pipe(
      take(1),
      tap((forecastWeather) => {
        if (!forecastWeather) {
          this.weatherFacade.loadForecastWeatherEntity(id);
        }
      }),
      map(() => true)
    );
  }
}
