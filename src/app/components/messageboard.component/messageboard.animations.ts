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

export const messageBoardAnimations = [
  trigger('messageBarTranslate', [
    state(VIEW_STATES.VISIBLE, style({
        transform: 'translateY(-100%)'
    })),
    state(VIEW_STATES.INVISIBLE, style({
        transform: 'translateY(0)'
    })),
    transition(
      `${VIEW_STATES.VISIBLE} <=> ${VIEW_STATES.INVISIBLE}`,
      animate('200ms ease-out')
    ),
    transition(
      `void => ${VIEW_STATES.VISIBLE}`,
      [ style({ transform: 'translateY(0)' }), animate('200ms ease-out') ]
    ),
    transition(
      `${VIEW_STATES.VISIBLE} => void`,
      animate('200ms ease-out', style({ transform: 'translateY(0)' }))
    )
  ]),
  trigger('messageBoardOpacity', [
    state(VIEW_STATES.VISIBLE, style({
        opacity: '1'
    })),
    state(VIEW_STATES.INVISIBLE, style({
        opacity: '0'
    })),
    transition(
      `${VIEW_STATES.VISIBLE} <=> ${VIEW_STATES.INVISIBLE}`,
      animate('300ms')
    ),
    transition(
      `void => ${VIEW_STATES.VISIBLE}`,
      [ style({ opacity: '0' }), animate('300ms') ]
    ),
    transition(
      `${VIEW_STATES.VISIBLE} => void`,
      animate('300ms', style({ opacity: '0' }))
    )
  ]),
  trigger('messageHistoryOpacity', [
    state(VIEW_STATES.VISIBLE, style({
        opacity: '1'
    })),
    state(VIEW_STATES.INVISIBLE, style({
        opacity: '0'
    })),
    transition(
      `${VIEW_STATES.VISIBLE} <=> ${VIEW_STATES.INVISIBLE}`,
      animate('150ms')
    ),
    transition(
      `void => ${VIEW_STATES.VISIBLE}`,
      [ style({ opacity: '0' }), animate('150ms') ]
    ),
    transition(
      `${VIEW_STATES.VISIBLE} => void`,
      animate('150ms', style({ opacity: '0' }))
    )
  ])
];