import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TemperatureFormatterPipe } from './temperature-formatter.pipe';
import { WindFormatterPipe } from './wind-formatter.pipe';

@NgModule({
  declarations: [TemperatureFormatterPipe, WindFormatterPipe],
  exports: [TemperatureFormatterPipe, WindFormatterPipe],
  imports: [CommonModule],
})
export class AppFormattersModule {}
