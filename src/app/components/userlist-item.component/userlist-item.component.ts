import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IUserlistItem } from '../../entities';
import { ViewStateService, SelectedUseridService } from '../../services';

@Component({
  selector: 'el-userlist-item',
  templateUrl: './userlist-item.component.html',
  styleUrls: ['./userlist-item.component.scss'],
  host: {
    class: 'el-userlist-item'
  },
  encapsulation: ViewEncapsulation.None
})
export class UserlistItemComponent implements OnInit, OnDestroy {
  @Input() public item: IUserlistItem;
  @Input() public isNameVisible: boolean;
  @Output() public select: EventEmitter<string> = new EventEmitter<string>();

  private selectedUseridServiceSubscription: Subscription;
  private viewState: string;
  private selectedUserId: string;

  constructor(
    private viewStateService: ViewStateService,
    private selectedUseridService: SelectedUseridService
  ) {}

  public ngOnInit(): void {
    this.selectedUseridServiceSubscription = this.selectedUseridService.getObservable()
      .subscribe((selectedUserId: string) => {
        this.selectedUserId= selectedUserId;
      });
    this.selectedUserId = this.selectedUseridService.getUserId();
  }

  public ngOnDestroy(): void {
    this.selectedUseridServiceSubscription.unsubscribe();
  }

  public onUserClick(_id: string): void {
    this.select.emit(_id);
  }

  public isActive(): boolean {
    return this.item._id === this.selectedUserId;
  }
};