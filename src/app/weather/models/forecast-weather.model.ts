export interface IForecastWeather {
  cod?: string;
  message?: number;
  cnt?: number;
  list?: IForecastWeatherEntity[];
  city?: City;
}

export interface City {
  id?: number;
  name?: string;
  coord?: Coord;
  country?: string;
  population?: number;
  timezone?: number;
  sunrise?: number;
  sunset?: number;
}

export interface Coord {
  lat?: number;
  lon?: number;
}

export interface IForecastWeatherEntity {
  dt?: number;
  main?: Main;
  weather?: Weather[];
  clouds?: Clouds;
  wind?: Wind;
  rain?: Rain;
  sys?: Sys;
  dt_txt?: Date | string;
}

export interface Clouds {
  all?: number;
}

export interface Main {
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  pressure?: number;
  sea_level?: number;
  grnd_level?: number;
  humidity?: number;
  temp_kf?: number;
}

export interface Rain {
  '3h'?: number;
}

export interface Sys {
  pod?: Pod;
}

export enum Pod {
  D = 'd',
  N = 'n',
}

export interface Weather {
  id?: number;
  main?: MainEnum;
  description?: Description;
  icon?: string;
}

export enum Description {
  BrokenClouds = 'broken clouds',
  ClearSky = 'clear sky',
  FewClouds = 'few clouds',
  LightRain = 'light rain',
  OvercastClouds = 'overcast clouds',
  ScatteredClouds = 'scattered clouds',
}

export enum MainEnum {
  Clear = 'Clear',
  Clouds = 'Clouds',
  Rain = 'Rain',
}

export interface Wind {
  speed?: number;
  deg?: number;
}
