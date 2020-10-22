import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';
import { WeatherApiService } from './weather-api.service';

describe('WeatherApiService', () => {
  let spectator: SpectatorHttp<WeatherApiService>;
  const createHttp = createHttpFactory(WeatherApiService);

  beforeEach(() => {
    spectator = createHttp();

    jest
      .spyOn<any, any>(spectator.service, 'getAppId')
      .mockImplementation(() => '&appid=1');
    jest
      .spyOn<any, any>(spectator.service, 'getBaseUrl')
      .mockImplementation(() => 'https://api');
    jest
      .spyOn<any, any>(spectator.service, 'getUnits')
      .mockImplementation(() => '&units=metric');
  });

  it('getCurrentWeather should be called with correct url and method', () => {
    spectator.service.getCurrentWeather('id1,id2').subscribe();
    spectator.expectOne(
      'https://api/group?id=id1,id2&units=metric&appid=1',
      HttpMethod.GET
    );
  });
  it('getCurrentWeather should be called with correct url and method', () => {
    spectator.service.getForecastWeather('id1').subscribe();
    spectator.expectOne(
      'https://api/forecast?id=id1&cnt=6&units=metric&appid=1',
      HttpMethod.GET
    );
  });
});
