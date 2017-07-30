import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AnimationEvent } from '@angular/animations';
import { Subscription } from 'rxjs';

import { MessageService, SelectedUseridService, ImgService, ViewStateService } from '../../services';
import { IMessage } from '../../entities';

import { VIEW_STATES, messageBoardAnimations } from './messageboard.animations';

@Component({
  selector: 'el-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.scss'],
  host: {
    class: 'el-messageboard'
  },
  animations: messageBoardAnimations
})
export class MessageboardComponent implements OnInit, OnDestroy {
  private messages: any[];
  private messageListSubscription: Subscription;
  private messageSendSubscription: Subscription;
  private detailsImg: string;
  private selectedId: string;
  private barVisualState: string;
  private boardVisualState: string;
  private noMessages: boolean;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private selectedUseridService: SelectedUseridService,
    private imgService: ImgService,
    private viewStateService: ViewStateService
  ) {}

  public ngOnInit(): void {
    this.detailsImg = this.imgService.resolve('details.png');

    this.barVisualState = VIEW_STATES.VISIBLE;
    this.boardVisualState = VIEW_STATES.VISIBLE;

    this.messageListSubscription = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.messages = undefined;
        this.selectedId = params.get('id');
        this.selectedUseridService.setUserId(this.selectedId);
        return this.messageService.getMessageList(this.selectedId)
      })
      .subscribe((messages: IMessage[]) => {
        this.messages = messages;
        this.noMessages = !(messages && messages.length);
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
    this.noMessages = false;
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

  public onDetailsClick() {
    this.boardVisualState = VIEW_STATES.INVISIBLE;
    this.barVisualState = VIEW_STATES.INVISIBLE;
  }

  public onStateChangeEnd($event: AnimationEvent): void {
    if ($event.toState === VIEW_STATES.INVISIBLE) {
      this.viewStateService.setViewState(
        ViewStateService.VIEW_STATES.DETAIL_VIEW
      );
    }
  }

  private uid(len: number): string {
    const buf = [];
    const chars = 'abcdef0123456789';
    const charlen = chars.length;

    for (var i = 0; i < len; ++i) {
      buf.push(chars[Math.random() * charlen | 0]);
    }
    return buf.join('');
  };
};