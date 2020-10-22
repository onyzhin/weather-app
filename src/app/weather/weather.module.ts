import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppBackButtonModule } from 'app/shared/components/back-button/back-button.module';
import { AppPreloaderModule } from 'app/shared/components/preloader/preloader.module';
import { AppFormattersModule } from 'app/shared/pipes/formatters.module';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { WeatherTileComponent } from './components/weather-tile/weather-tile.component';
import { WeatherTimelineComponent } from './components/weather-timeline/weather-timeline.component';
import { WeatherDetailsComponent } from './containers/weather-details/weather-details.component';
import { WeatherComponent } from './containers/weather/weather.component';

@NgModule({
  declarations: [
    WeatherComponent,
    WeatherDetailsComponent,
    WeatherListComponent,
    WeatherTileComponent,
    WeatherTimelineComponent,
  ],
  imports: [
    CommonModule,
    AppBackButtonModule,
    AppPreloaderModule,
    AppFormattersModule,
  ],
})
export class WeatherModule {}
