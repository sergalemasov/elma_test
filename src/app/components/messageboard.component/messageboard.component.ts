import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { MessageService } from '../../services';
import {
  IMessage
} from '../../entities';

@Component({
  selector: 'el-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.scss'],
  host: {
    class: 'el-messageboard'
  }
})
export class MessageboardComponent implements OnInit, OnDestroy {
  private messages: any[];
  private messageListSubscription: Subscription;
  private messageSendSubscription: Subscription;

  private selectedId: string;

  constructor(private route: ActivatedRoute, private messageService: MessageService) {}

  public ngOnInit(): void {
    this.messageListSubscription = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedId = params.get('id');
        return this.messageService.getMessageList(this.selectedId)
      })
      .subscribe((messages: IMessage[]) => {
        this.messages = messages;
      });
  }

  public ngOnDestroy() {
    this.messageListSubscription.unsubscribe();

    if (this.messageSendSubscription) {
      this.messageSendSubscription.unsubscribe();
    }
  }

  public onSend(messageInput: string) {
    const newMessage: IMessage = {
      id: this.uid(32),
      text: messageInput,
      status: 0
    };
    this.messages.push(newMessage);
    this.messageSendSubscription = this.messageService.sendMessage(this.selectedId, newMessage)
      .subscribe((returnedMessage: IMessage) => {
        const ix = this.messages.findIndex((message: IMessage) => {
          return message.id === returnedMessage.id;
        });
        if (ix > -1) {
          this.messages[ix] = returnedMessage;
        }
      });
  }

  private uid(len: number): string {
    var buf = [],
        chars = 'abcdef0123456789',
        charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[Math.random() * charlen | 0]);
    }

    return buf.join('');
  };
};