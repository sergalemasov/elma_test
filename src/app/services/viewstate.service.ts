import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Injectable()
export class ViewStateService {
  private viewState: string;
  private routerSubscription: Subscription;
  private stateSubject: Subject<string>;

  static VIEW_STATES = Object.freeze({
    FULL_VIEW: '0',
    DETAIL_VIEW: '1',
    MESSAGE_VIEW: '2'
  });

  constructor(private router: Router) {
    this.stateSubject = new Subject<string>();
    this.routerSubscription = this.router.events
      .subscribe(this.onRouterEvent.bind(this));
  }

  public getObservable(): Subject<string> {
    return this.stateSubject;
  }

  public getViewstate(): string {
    return this.viewState;
  }

  public setViewState(viewState: string) {
    this.viewState = viewState;
    this.stateSubject.next(this.viewState);
  }

  private onRouterEvent(event: NavigationStart): void {
    if (this.viewState) {
      this.routerSubscription.unsubscribe();
      return;
    }

    if (event instanceof NavigationStart) {
      switch (true) {
        case (event.url === '/'):
          this.viewState = ViewStateService.VIEW_STATES.FULL_VIEW;
          break;
        case /user/.test(event.url):
          this.viewState = ViewStateService.VIEW_STATES.DETAIL_VIEW;
          break;
        case /messageboard/.test(event.url):
          this.viewState = ViewStateService.VIEW_STATES.MESSAGE_VIEW;
          break;
      }
      this.stateSubject.next(this.viewState);
    }
  }
}