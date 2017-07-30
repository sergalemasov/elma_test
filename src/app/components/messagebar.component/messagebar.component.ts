import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'el-messagebar',
  templateUrl: './messagebar.component.html',
  styleUrls: ['./messagebar.component.scss'],
  host: {
    class: 'el-messagebar'
  }
})
export class MessagebarComponent {
  @Output() public send: EventEmitter<string> = new EventEmitter<string>();

  public messageInput: string;

  public onSend(): void {
    if (this.messageInput) {
      this.send.emit(this.messageInput);
      this.messageInput = '';
    }
  }
};