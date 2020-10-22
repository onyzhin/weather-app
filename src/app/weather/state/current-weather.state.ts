import { ICurrentWeather } from './../models/current-weather.model';
import { Injectable } from '@angular/core';
import { StateService } from '@core/store';
import { Observable } from 'rxjs';

interface ICurrentWeatherState {
  entities: ICurrentWeather[];
  citiesList: string[];
  loaded: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: ICurrentWeatherState = {
  entities: [],
  citiesList: ['2759794', '703448', '2761369', '2968815', '2673730'],
  loaded: false,
  loading: false,
  error: null,
};

@Injectable({ providedIn: 'root' })
export class CurrentWeatherState extends StateService<ICurrentWeatherState> {
  readonly entities$: Observable<ICurrentWeather[]> = this.select(
    (state) => state.entities
  );
  readonly citiesList$: Observable<string[]> = this.select(
    (state) => state.citiesList
  );
  readonly loaded$: Observable<boolean> = this.select((state) => state.loaded);
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

  setWeatherState(entities: ICurrentWeather[]): void {
    this.setState({ entities, loaded: true, loading: false, error: false });
  }

  addWeatherEntity(entity: ICurrentWeather): void {
    this.setState({
      entities: [...this.state.entities, entity],
      loading: false,
      error: false,
    });
  }
}
