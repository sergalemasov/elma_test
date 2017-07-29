import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../../services';
import { IUserlistItem } from '../../entities';

@Component({
  selector: 'el-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss'],
  host: {
    class: 'el-userlist'
  }
})
export class UserlistComponent implements OnInit {
  public $userlist: Observable<IUserlistItem[]>;

  constructor(private userService: UserService) { }

  public ngOnInit(): void {
    this.$userlist = this.userService.getUserlist();
  }
};