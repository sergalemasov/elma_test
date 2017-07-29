import { Injectable } from '@angular/core';
import { FakeHttpService } from './fakehttp.service';
import { Observable } from 'rxjs';

import {
  IRawMessage,
  IMessage
} from '../entities';


@Injectable()
export class MessageService {
  constructor(private http: FakeHttpService) {}

  public getMessageList(_id: string): Observable<IMessage[]> {
    return this.http.get('/messages/' + _id)
      .map((response) => this.convertMessageList(response.json()))
      .catch((err: any) => {
        this.logHttpError(err);
        return Observable.of([]);
      });
  }

  public sendMessage(_id: string, message: IMessage): Observable<IMessage> {
    return this.http.post('/messages/' + _id, this.deconvertMessage(message))
      .map((response) => this.convertMessage(response.json()))
      .catch((err: any) => {
        this.logHttpError(err);
        return Observable.of({
          id: message.id,
          text: message.text,
          status: 2
        });
      });
  }

  private convertMessageList(rawMessageList: IRawMessage[]): IMessage[] {
    return rawMessageList.map(this.convertMessage);
  }

  private convertMessage(rawMessage: IRawMessage): IMessage {
    return {
      id: rawMessage.id,
      text: rawMessage.text,
      status: 1
    }
  }

  private deconvertMessage(message: IMessage): IRawMessage {
    return {
      id: message.id,
      text: message.text
    }
  }

  private logHttpError(err: any) {
    console.log('http error: ', err.status);
  }
}