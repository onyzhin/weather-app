import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { AppFormattersModule } from 'app/shared/pipes/formatters.module';
import { ICurrentWeather } from 'app/weather/models/current-weather.model';
import { WeatherListComponent } from './weather-list.component';

describe('WeatherListComponent', () => {
  let spectator: SpectatorHost<WeatherListComponent>;
  const createHost = createHostFactory({
    component: WeatherListComponent,
    imports: [AppFormattersModule],
  });
  const entities: ICurrentWeather[] = [];

  beforeEach(
    () =>
      (spectator = createHost(
        `<app-weather-list [entities]="entities"></app-weather-list>`,
        {
          hostProps: { entities },
        }
      ))
  );

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show all entities from Input() in list', () => {
    spectator.setHostInput({
      entities: [
        {
          main: {
            temp: 10,
          },
        },
        {
          main: {
            temp: 12,
          },
        },
      ],
    });
    expect(spectator.queryAll('.table-row').length).toBe(2);
  });
});
