import {
  animate,
  AnimationTriggerMetadata,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function fadeInAndOutAnimation(
  duration: number = 0.2
): AnimationTriggerMetadata {
  return trigger('fadeInAndOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(`${duration}s ease-out`, style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate(`${duration}s ease-out`, style({ opacity: 0 })),
    ]),
  ]);
}
