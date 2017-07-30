import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const messageAnimations = [
  trigger('flyMessage', [
    state('visible', style({opacity: 0.6, transform: 'translateX(0)'})),
    transition('void => visible', [
      style({
        opacity: 0,
        transform: 'translateX(100%)'
      }),
      animate('100ms ease-in')
    ])
  ])
];
