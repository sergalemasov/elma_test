import { Component, Input } from '@angular/core';
import { IUserlistItem } from '../../entities';

@Component({
  selector: 'el-userlist-item',
  templateUrl: './userlist-item.component.html',
  styleUrls: ['./userlist-item.component.scss'],
  host: {
    class: 'el-userlist-item'
  }
})
export class UserlistItemComponent {
  @Input() public item: IUserlistItem;
};