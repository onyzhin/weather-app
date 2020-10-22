import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreloaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
