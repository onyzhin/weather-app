import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherDetailsComponent } from './weather/containers/weather-details/weather-details.component';
import { WeatherComponent } from './weather/containers/weather/weather.component';
import { WeatherDetailsGuard } from './weather/guards/weather-details.guard';
import { WeatherGuard } from './weather/guards/weather.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather',
  },
  {
    path: 'weather',
    children: [
      {
        path: '',
        component: WeatherComponent,
        canActivate: [WeatherGuard],
      },
      {
        path: ':id',
        component: WeatherDetailsComponent,
        canActivate: [WeatherDetailsGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
