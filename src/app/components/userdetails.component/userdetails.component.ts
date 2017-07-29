import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { UserService } from '../../services';
import { IUserDetails } from '../../entities';

@Component({
  selector: 'el-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
  host: {
    class: 'el-userdetails'
  }
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  public details: IUserDetails;
  private detailsSubscribtion: Subscription;
  private selectedId: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  public ngOnInit(): void {
    this.detailsSubscribtion = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = params.get('id');
        return this.userService.getUserDetails(this.selectedId)
      })
      .subscribe((details: IUserDetails) => {
        console.log(details);
        this.details = details;
      });
  }

  public ngOnDestroy() {
    this.detailsSubscribtion.unsubscribe();
  }
};