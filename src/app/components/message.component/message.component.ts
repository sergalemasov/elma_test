import { Component, Input, HostBinding } from '@angular/core';
import { messageAnimations } from './message.animations';

@Component({
  selector: 'el-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  host: {
    class: 'el-message'
  },
  animations: messageAnimations
})
export class MessageComponent {
  @Input() public item: any;
  @HostBinding('@flyMessage') state: string;
  @HostBinding('class.el-message--loaded') loaded: boolean;

  constructor() {}

  public ngOnInit(): void {
    if (this.item.status === 0) {
      this.state = 'visible';
    } else {
      this.loaded = true;
    }
  }
};
