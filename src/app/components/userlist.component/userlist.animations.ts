import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ViewStateService } from '../../services';

const VIEW_STATES = ViewStateService.VIEW_STATES;

export const userlistAnimations = [
  trigger('userListState', [
    state(VIEW_STATES.FULL_VIEW, style({
      width: '900px'
    })),
    state(VIEW_STATES.DETAIL_VIEW, style({
      width: '450px'
    })),
    state(VIEW_STATES.MESSAGE_VIEW, style({
      width: '82px'
    })),
    transition(`${VIEW_STATES.FULL_VIEW} => ${VIEW_STATES.DETAIL_VIEW}`, animate('100ms ease-in')),
    transition(`${VIEW_STATES.DETAIL_VIEW} => ${VIEW_STATES.MESSAGE_VIEW}`, animate('100ms ease-in')),
    transition(`${VIEW_STATES.MESSAGE_VIEW} => ${VIEW_STATES.DETAIL_VIEW}`, animate('100ms ease-out')),
    transition(`${VIEW_STATES.DETAIL_VIEW} => ${VIEW_STATES.FULL_VIEW}`, animate('100ms ease-out'))
  ])
];