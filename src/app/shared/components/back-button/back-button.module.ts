import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  exports: [BackButtonComponent],
  imports: [CommonModule],
})
export class AppBackButtonModule {}
