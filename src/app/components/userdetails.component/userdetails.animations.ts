import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const VIEW_STATES = Object.freeze({
  VISIBLE: '0',
  INVISIBLE: '1'
});

export const userDetailsAnimations = [
  trigger('spinnerOpacity', [
    state('in', style({ opacity: '1' })),
    transition('void => in', [style({ opacity: '0' }),
        animate('100ms')
    ]),
    transition('in => void', [
        animate('100ms', style({ opacity: '0' }))
    ])
  ]),
  trigger('detailsOpacity', [
    state(VIEW_STATES.VISIBLE, style({
        opacity: '1'
    })),
    state(VIEW_STATES.INVISIBLE, style({
        opacity: '0'
    })),
    transition(
      `${VIEW_STATES.VISIBLE} <=> ${VIEW_STATES.INVISIBLE}`,
      animate('100ms')
    ),
    transition(
      `void => ${VIEW_STATES.VISIBLE}`,
      [ style({ opacity: '0' }), animate('100ms') ]
    ),
    transition(
      `${VIEW_STATES.VISIBLE} => void`,
      animate('100ms', style({ opacity: '0' }))
    )
  ])
];
