import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PreloaderComponent } from 'app/shared/components/preloader/preloader.component';
import { WeatherFacade } from 'app/weather/weather.facade';
import { of } from 'rxjs';
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let spectator: Spectator<WeatherComponent>;
  const createComponent = createComponentFactory({
    component: WeatherComponent,
    declarations: [PreloaderComponent],
    mocks: [WeatherFacade],
    imports: [RouterTestingModule],
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
      .spyOn(weatherFacade, 'getCurrentWeatherLoading$')
      .mockReturnValue(of(true));

    spectator.detectChanges();

    expect(spectator.query('app-preloader')).toBeTruthy();
  });

  it('should show weather-list', () => {
    expect(spectator.query('app-weather-list')).toBeTruthy();
  });

  it(`shouldn't show alert message by default`, () => {
    const weatherFacade = spectator.inject(WeatherFacade);
    jest
      .spyOn(weatherFacade, 'getCurrentWeatherError$')
      .mockReturnValue(of(null));

    spectator.detectChanges();

    expect(spectator.query('.alert-danger')).toBeFalsy();
  });

  it(`should show alert message if error exists`, () => {
    const weatherFacade = spectator.inject(WeatherFacade);
    jest
      .spyOn(weatherFacade, 'getCurrentWeatherError$')
      .mockReturnValue(of(true));

    spectator.detectChanges();

    expect(spectator.query('.alert-danger')).toBeTruthy();
  });

  it(`should navigate to /weather:id after click on openWeatherDetails`, () => {
    const router = spectator.inject(Router);
    jest.spyOn(router, 'navigate').mockImplementation();

    spectator.component.openWeatherDetails('id1');

    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/weather', 'id1']);
  });
});
