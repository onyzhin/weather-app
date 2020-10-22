import { IStringTMap } from '@core/models';
import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';
import { of, throwError } from 'rxjs';
import { WeatherApiService } from './api/weather-api.service';
import {
  ICurrentWeather,
  ICurrentWeatherList,
} from './models/current-weather.model';
import { IForecastWeather } from './models/forecast-weather.model';
import { CurrentWeatherState } from './state/current-weather.state';
import { ForecastWeatherState } from './state/forecast-weather.state';
import { WeatherFacade } from './weather.facade';

describe('WeatherFacade', () => {
  let spectator: SpectatorService<WeatherFacade>;
  let currentWeatherState: SpyObject<CurrentWeatherState>;
  const createService = createServiceFactory({
    service: WeatherFacade,
    providers: [
      mockProvider(CurrentWeatherState, {
        entities$: of([{ main: { temp: 10 } }] as ICurrentWeather[]),
        citiesList$: of(['id1', 'id2']),
        loaded$: of(true),
        loading$: of(false),
        error$: of(null),
        setLoading: jest.fn(),
        setError: jest.fn(),
      }),
      mockProvider(ForecastWeatherState, {
        entities$: of({
          id1: {
            list: [
              {
                main: {
                  temp: 10,
                },
              },
            ],
          },
        } as IStringTMap<IForecastWeather>),
      }),
      mockProvider(WeatherApiService, {
        getCurrentWeather: jest.fn().mockReturnValue(
          of({
            list: [
              {
                main: {
                  temp: 10,
                },
              },
            ],
          } as ICurrentWeatherList)
        ),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createService();
    currentWeatherState = spectator.inject(CurrentWeatherState);
  });

  it('getCurrentWeatherEntities should return entities from CurrentWeatherState', (done) => {
    spectator.service.getCurrentWeatherEntities$().subscribe((entities) => {
      expect(entities).toEqual([{ main: { temp: 10 } }]);
      done();
    });
  });

  it('getCurrentWeatherCitiesList should return cities list by id from CurrentWeatherState', (done) => {
    spectator.service
      .getCurrentWeatherCitiesList$()
      .subscribe((citiesListById) => {
        expect(citiesListById).toEqual(['id1', 'id2']);
        done();
      });
  });

  it('getCurrentWeatherLoaded should return boolean value from CurrentWeatherState', (done) => {
    spectator.service.getCurrentWeatherLoaded$().subscribe((loaded) => {
      expect(loaded).toBeTruthy();
      done();
    });
  });

  it('getCurrentWeatherLoading should return boolean value from CurrentWeatherState', (done) => {
    spectator.service.getCurrentWeatherLoading$().subscribe((loading) => {
      expect(loading).toBeFalsy();
      done();
    });
  });

  it('getCurrentWeatherError should return error value from CurrentWeatherState', (done) => {
    spectator.service.getCurrentWeatherError$().subscribe((error) => {
      expect(error).toBeFalsy();
      done();
    });
  });

  describe('loadCurrentWeather', () => {
    it('should call setLoading', () => {
      spectator.service.loadCurrentWeather(['id1', 'id2']);
      expect(currentWeatherState.setLoading).toHaveBeenCalled();
      expect(currentWeatherState.setLoading).toHaveBeenCalledTimes(1);
      expect(currentWeatherState.setLoading).toHaveBeenCalledWith(true);
    });
    it('should set new state', () => {
      spectator.service.loadCurrentWeather(['id1', 'id2']);
      expect(currentWeatherState.setWeatherState).toHaveBeenCalled();
      expect(currentWeatherState.setWeatherState).toHaveBeenCalledTimes(1);
      expect(currentWeatherState.setWeatherState).toHaveBeenCalledWith([
        {
          main: {
            temp: 10,
          },
        },
      ]);
    });

    describe('API returns error', () => {
      let weatherApiService: SpyObject<WeatherApiService>;
      beforeEach(() => {
        weatherApiService = spectator.inject(WeatherApiService);
        jest
          .spyOn(weatherApiService, 'getCurrentWeather')
          .mockImplementation(() => throwError('ERROR'));
      });

      it('should set error', () => {
        spectator.service.loadCurrentWeather(['id1', 'id2']);

        expect(currentWeatherState.setWeatherState).not.toHaveBeenCalled();
        expect(currentWeatherState.setError).toHaveBeenCalled();
      });

      it('should set loading to false', () => {
        spectator.service.loadCurrentWeather(['id1', 'id2']);

        expect(currentWeatherState.setLoading).toHaveBeenCalled();
        expect(currentWeatherState.setLoading).toHaveBeenCalledWith(false);
      });
    });
  });
});
