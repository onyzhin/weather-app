import { WeatherFacade } from 'app/weather/weather.facade';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { WeatherGuard } from './weather.guard';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { first } from 'rxjs/operators';

describe('WeatherGuard', () => {
  let spectator: SpectatorService<WeatherGuard>;
  let weatherFacade: SpyObject<WeatherFacade>;
  const createService = createServiceFactory({
    service: WeatherGuard,
    providers: [
      mockProvider(WeatherFacade, {
        getCurrentWeatherCitiesList$: jest.fn().mockReturnValue(of(['id1'])),
        getCurrentWeatherLoaded$: jest.fn(),
        loadCurrentWeather: jest.fn(),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    weatherFacade = spectator.inject(WeatherFacade);
  });

  it('should not load current weather if it already loaded', fakeAsync(() => {
    jest
      .spyOn(weatherFacade, 'getCurrentWeatherLoaded$')
      .mockImplementation(() => of(true));

    spectator.service.checkStore().subscribe();
    tick();

    expect(weatherFacade.loadCurrentWeather).not.toHaveBeenCalled();
  }));

  it('should load current weather if it has not been loaded yet ', fakeAsync(() => {
    jest
      .spyOn(weatherFacade, 'getCurrentWeatherLoaded$')
      .mockImplementation(() => of(false));

    spectator.service.canActivate().pipe(first()).subscribe();
    tick();

    expect(weatherFacade.loadCurrentWeather).toHaveBeenCalled();
    expect(weatherFacade.loadCurrentWeather).toHaveBeenCalledWith(['id1']);
  }));
});
