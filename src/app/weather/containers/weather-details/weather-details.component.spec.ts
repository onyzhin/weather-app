import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { PreloaderComponent } from 'app/shared/components/preloader/preloader.component';
import { WeatherFacade } from 'app/weather/weather.facade';
import { of } from 'rxjs';
import { WeatherDetailsComponent } from './weather-details.component';

describe('WeatherComponent', () => {
  let spectator: Spectator<WeatherDetailsComponent>;
  const createComponent = createComponentFactory({
    component: WeatherDetailsComponent,
    declarations: [PreloaderComponent],
    imports: [RouterTestingModule],
    providers: [
      mockProvider(ActivatedRoute, {
        paramMap: of({
          get: () => 'id1',
        }),
      }),
      mockProvider(WeatherFacade, {
        getForecastWeatherEntity$: jest.fn().mockReturnValue(of({ id1: {} })),
        getForecastWeatherLoading$: jest.fn().mockReturnValue(of(false)),
      }),
    ],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => (spectator = createComponent({})));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should show preloader', () => {
    const weatherFacade = spectator.inject(WeatherFacade);
    jest
      .spyOn(weatherFacade, 'getForecastWeatherLoading$')
      .mockReturnValue(of(true));

    spectator.detectChanges();

    expect(spectator.query('app-preloader')).toBeTruthy();
  });

  it('should show weather-timeline', () => {
    spectator.detectChanges();

    expect(spectator.query('app-weather-timeline')).toBeTruthy();
  });

  it(`should navigate to /weather after click on openWeatherList`, () => {
    const router = spectator.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation();

    spectator.triggerEventHandler('app-back-button', 'backClick', {});

    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/weather']);
  });
});
