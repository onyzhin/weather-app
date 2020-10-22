import { fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { WeatherFacade } from 'app/weather/weather.facade';
import { of } from 'rxjs';
import { WeatherDetailsGuard } from './weather-details.guard';

describe('WeatherDetailsGuard', () => {
  let spectator: SpectatorService<WeatherDetailsGuard>;
  let weatherFacade: SpyObject<WeatherFacade>;
  const createService = createServiceFactory({
    service: WeatherDetailsGuard,
    providers: [
      mockProvider(WeatherFacade, {
        getForecastWeatherEntity$: jest.fn(),
        loadForecastWeatherEntity: jest.fn(),
      }),
      mockProvider(ActivatedRouteSnapshot, {
        params: {
          id: 'id1',
        },
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    weatherFacade = spectator.inject(WeatherFacade);
  });

  it('should not load forecast weather entity if it already loaded', fakeAsync(() => {
    jest
      .spyOn(weatherFacade, 'getForecastWeatherEntity$')
      .mockImplementation(() => of({}));

    spectator.service.checkStore('id1').subscribe();
    tick();

    expect(weatherFacade.loadForecastWeatherEntity).not.toHaveBeenCalled();
  }));

  it(`should load forecast weather entity if it hasn't been loaded yet`, fakeAsync(() => {
    jest
      .spyOn(weatherFacade, 'getForecastWeatherEntity$')
      .mockImplementation(() => of(null));

    spectator.service.checkStore('id1').subscribe();
    tick();

    expect(weatherFacade.loadForecastWeatherEntity).toHaveBeenCalled();
    expect(weatherFacade.loadForecastWeatherEntity).toHaveBeenCalledWith('id1');
  }));
});
