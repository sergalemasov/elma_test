import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable()
export class SelectedUseridService {
  private userIdSubject: Subject<string>;
  private selectedUserId: string;
  private routerSubscription: Subscription;

  constructor(private router: Router) {
    this.userIdSubject = new Subject<string>();
    this.routerSubscription = this.router.events
      .subscribe(this.onRouterEvent.bind(this));
  }

  public getObservable(): Subject<string> {
    return this.userIdSubject;
  }

  public getUserId(): string {
    return this.selectedUserId;
  }

  public setUserId(userId: string) {
    this.selectedUserId = userId;
    this.userIdSubject.next(userId);
  }

  private onRouterEvent(event: any): void {
    if (this.selectedUserId) {
      this.routerSubscription.unsubscribe();
      return;
    }

    if (event instanceof NavigationStart) {
      if (/\/user\/([a-f0-9]+)$/.test(event.url)) {
        this.selectedUserId = RegExp.$1;
        this.userIdSubject.next(this.selectedUserId);
      }
    }
  }
}