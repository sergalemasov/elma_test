import { Component, Input } from '@angular/core';

@Component({
  selector: 'el-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  host: {
    class: 'el-message'
  }
})
export class MessageComponent {
  @Input() public item: any;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy() {
  }
};