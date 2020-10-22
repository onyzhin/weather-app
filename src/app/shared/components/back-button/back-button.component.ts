import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent implements OnInit {
  @Output() backClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.backClick.emit();
  }
}
