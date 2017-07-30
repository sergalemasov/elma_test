import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';

import { UserService, ViewStateService, SelectedUseridService } from '../../services';
import { IUserDetails } from '../../entities';
import { VIEW_STATES, userDetailsAnimations } from './userdetails.animations';


@Component({
  selector: 'el-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
  host: {
    class: 'el-userdetails'
  },
  animations: userDetailsAnimations
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public details: IUserDetails;
  public detailsVisibility: string;
  private detailsSubscribtion: Subscription;
  private selectedId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private selectedUseridService: SelectedUseridService,
    private viewStateService: ViewStateService
  ) {
  }

  public ngOnInit(): void {
    this.detailsSubscribtion = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.details = null;
        const selectedUserId = params.get('id');
        this.selectedUseridService.setUserId(selectedUserId);
        return this.userService.getUserDetails(selectedUserId);
      })
      .subscribe((details: IUserDetails) => {
        this.details = details;
        this.detailsVisibility = VIEW_STATES.VISIBLE;
      });
  }

  public ngOnDestroy() {
    this.detailsSubscribtion.unsubscribe();
  }

  public onStartButtonClick(): void {
    this.detailsVisibility = VIEW_STATES.INVISIBLE;
  }

  public onStateChangeEnd($event: AnimationEvent): void {
    if ($event.toState === VIEW_STATES.INVISIBLE) {
      this.viewStateService.setViewState(
        ViewStateService.VIEW_STATES.MESSAGE_VIEW
      );
    }
  }
};