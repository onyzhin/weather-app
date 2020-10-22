import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ICurrentWeatherList } from '../models/current-weather.model';
import { IForecastWeather } from '../models/forecast-weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private httpClient: HttpClient) {}

  public getForecastWeather(id: string): Observable<IForecastWeather> {
    return this.httpClient.get<IForecastWeather>(
      `${this.getBaseUrl()}/forecast?id=${id}&cnt=6${this.getUnits()}${this.getAppId()}`
    );
  }

  public getCurrentWeather(id: string): Observable<ICurrentWeatherList> {
    return this.httpClient.get<ICurrentWeatherList>(
      `${this.getBaseUrl()}/group?id=${id}${this.getUnits()}${this.getAppId()}`
    );
  }

  private getBaseUrl(): string {
    return `${environment.weatherApiConfig.baseUrl}`;
  }
  private getUnits(): string {
    return `${environment.weatherApiConfig.units}`;
  }
  private getAppId(): string {
    return `${environment.weatherApiConfig.appId}`;
  }
}
