import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { AppFormattersModule } from 'app/shared/pipes/formatters.module';
import { IForecastWeatherEntity } from 'app/weather/models/forecast-weather.model';
import { WeatherTileComponent } from './weather-tile.component';

describe('WeatherTileComponent', () => {
  let spectator: SpectatorHost<WeatherTileComponent>;
  const createHost = createHostFactory({
    component: WeatherTileComponent,
    imports: [AppFormattersModule],
  });
  const forecast: IForecastWeatherEntity = {
    dt_txt: 'Thu Oct 11 2020 11:00:00 GMT+0300',
    main: {
      temp: 10,
    },
    wind: {
      speed: 10,
    },
  } as any;

  beforeEach(
    () =>
      (spectator = createHost(
        `<app-weather-tile [forecast]="forecast"></app-weather-tile>`,
        {
          hostProps: { forecast },
        }
      ))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show time in correct format', () => {
    expect(spectator.query('.weather-time')).toHaveText('11:00');
  });
  it(`should show temperature`, () => {
    expect(spectator.query('.weather-temp')).toBeTruthy();
  });

  it(`shouldn't show weather-date if forecast date is same as current`, () => {
    spectator.component.currentDate = new Date(
      'Thu Oct 11 2020 14:00:00 GMT+0300'
    );

    spectator.setHostInput({
      forecast: {
        ...forecast,
        dt_txt: 'Thu Oct 11 2020 11:00:00 GMT+0300',
      },
    });
    expect(spectator.query('.weather-date')).toBeFalsy();
  });

  it(`should show weather-date if forecast date is not same date as current`, () => {
    spectator.component.currentDate = new Date(
      'Thu Oct 11 2020 11:00:00 GMT+0300'
    );

    spectator.setHostInput({
      forecast: {
        ...forecast,
        dt_txt: 'Thu Oct 12 2020 11:00:00 GMT+0300',
      },
    });

    expect(spectator.query('.weather-date')).toBeTruthy();
    expect(spectator.query('.weather-date')).toContainText('(Oct 12)');
  });
});
