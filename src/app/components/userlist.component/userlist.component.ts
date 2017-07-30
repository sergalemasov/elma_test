import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { UserService, ViewStateService, SelectedUseridService } from '../../services';
import { IUserlistItem } from '../../entities';
import { userlistAnimations } from './userlist.animations';

const VIEW_STATES = ViewStateService.VIEW_STATES;

@Component({
  selector: 'el-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  host: {
    class: 'el-userlist'
  },
  animations: userlistAnimations
})
export class UserlistComponent implements OnInit, OnDestroy {
  public $userlist: Observable<IUserlistItem[]>;
  public userListState: string;
  public isNameVisible: boolean;

  private selectedUserId: string;
  private viewStateSubscription: Subscription;
  private routeSubscription: Subscription;
  private selectedUserIdSubscription: Subscription;

  constructor(
    private userService: UserService,
    private selectedUseridService: SelectedUseridService,
    private router: Router,
    private viewStateService: ViewStateService
  ) {}

  public ngOnInit(): void {
    this.hideNames();
    this.selectedUserIdSubscription = this.selectedUseridService.getObservable()
      .subscribe((userId: string) => {
        this.selectedUserId = userId;
      });
    this.viewStateSubscription = this.viewStateService.getObservable()
      .subscribe((viewState: string) => {
        this.userListState = viewState;
        if (viewState === VIEW_STATES.MESSAGE_VIEW) {
          this.hideNames();
        }
      });
    const viewState = this.viewStateService.getViewstate();
    if (viewState) {
      this.userListState = viewState;
    }

    this.$userlist = this.userService.getUserlist();
  }

  public ngOnDestroy(): void {
    this.viewStateSubscription.unsubscribe();
    this.selectedUserIdSubscription.unsubscribe();
  }

  public onUserSelect(_id: string): void {
    this.selectedUserId = _id;
    switch (this.userListState) {
      case VIEW_STATES.FULL_VIEW:
        this.viewStateService.setViewState(VIEW_STATES.DETAIL_VIEW);
        break;
      case VIEW_STATES.DETAIL_VIEW:
        this.router.navigate(['/user/' + this.selectedUserId]);
        break;
      case VIEW_STATES.MESSAGE_VIEW:
        this.router.navigate(['/messageboard/' + this.selectedUserId]);
        break;
    }
  }

  public showNames(): void {
    this.isNameVisible = true;
  }

  public hideNames(): void {
    this.isNameVisible = false;
  }

  public onStateChangeEnd($event: AnimationEvent): void {
    switch($event.toState) {
      case VIEW_STATES.DETAIL_VIEW:
      case VIEW_STATES.FULL_VIEW:
        this.showNames();
    }

    if (!$event.fromState || $event.fromState === 'void') {
      return;
    }

    switch($event.toState) {
      case VIEW_STATES.DETAIL_VIEW:
        this.router.navigate(['/user/' + this.selectedUserId]);
        break;
      case VIEW_STATES.FULL_VIEW:
         this.router.navigate(['/']);
         break;
      case VIEW_STATES.MESSAGE_VIEW:
        this.router.navigate(['/messageboard/' + this.selectedUserId])
    }
  }
};