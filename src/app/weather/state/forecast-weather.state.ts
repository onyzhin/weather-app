import { Injectable } from '@angular/core';
import { IStringTMap } from '@core/models';
import { StateService } from '@core/store';
import { Observable } from 'rxjs';
import { IForecastWeather } from '../models/forecast-weather.model';

interface IForecastWeatherState {
  entities: IStringTMap<IForecastWeather>;
  loading: boolean;
  error: boolean;
}

const initialState: IForecastWeatherState = {
  entities: {},
  loading: false,
  error: false,
};

@Injectable({ providedIn: 'root' })
export class ForecastWeatherState extends StateService<IForecastWeatherState> {
  readonly entities$: Observable<IStringTMap<IForecastWeather>> = this.select(
    (state) => state.entities
  );
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loading
  );
  readonly error$: Observable<boolean> = this.select((state) => state.error);

  constructor() {
    super(initialState);
  }

  setLoading(loading: boolean): void {
    this.setState({ loading });
  }

  setError(error: boolean): void {
    this.setState({ error });
  }

  addForecastEntity(entity: IForecastWeather): void {
    this.setState({
      entities: {
        ...this.state.entities,
        [entity.city.id]: {
          ...entity,
          list: [...entity.list],
        },
      },
      loading: false,
      error: false,
    });
  }
}
