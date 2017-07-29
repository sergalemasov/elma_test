import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as USERLIST from '../../mocks/userlist.json';
import { StorageService } from './storage.service';

@Injectable()
export class FakeHttpService {
  private userlist: any;
  private messageStorageKey: string;

  constructor(private storageService: StorageService) {
    this.userlist = <any>USERLIST;
    this.messageStorageKey = 'messages';
  }

  public get(url: string): Observable<any> {
    return this.fakeRequest(url, 'get')
  }

  public post(url: string, body: any|null): Observable<any> {
    return this.fakeRequest(url, 'post', body);
  }

  private fakeRequest(url: string, method: string, body?: any | null): Observable<any> {
    const response = this.routeRequest(url, body);

    let $response: Observable<any>;
    if (response) {
      $response = Observable.create((observer: Observer<any>) => {
        observer.next({
          json: function() {
            return response;
          }
        });
      });
    } else {
      $response = Observable.throw({
        status: 400
      });
    }
    return $response.delay(this.calculateRandomDelay());
  }

  private routeRequest(url: string, body?: any | null): any {
    let response: any;

    switch (true) {
      case /\/users$/.test(url):
        response = this.getRawUserList();
        break;

      case /\/users\/([a-f0-9]+)$/.test(url):
        response = this.getRawUserById(RegExp.$1);
        break;

      case /\/messages\/([a-f0-9]+)$/.test(url):
        if (body) {
          response = this.addMessageToStorage(RegExp.$1, body);
        } else {
          response = this.getMessageList(RegExp.$1);
        }
        break;

      default:
        response = null;
    }

    return response;
  }

  private getRawUserList(): any {
    return this.userlist.slice();
  }

  private getRawUserById(_id: string): any {
    const ix: number = this.userlist.findIndex((user: any) => {
      return user._id === _id;
    });
    return ix > -1 ? Object.assign({}, this.userlist[ix]) : null;
  }

  private getMessageList(_id: string): any {
    const messageStorage = this.storageService.getItem(this.messageStorageKey);

    if (messageStorage !== null) {
      return messageStorage[_id] || [];
    }

    return [];
  }

  private addMessageToStorage(_id: string, message: any): any {
    let messageStorage = this.storageService.getItem(this.messageStorageKey);

    if (messageStorage === null) {
      messageStorage = {};
      messageStorage[_id] = [];
    } else if (!messageStorage[_id]) {
      messageStorage[_id] = [];
    }
    messageStorage[_id].push(message);

    this.storageService.setItem(this.messageStorageKey, messageStorage);

    return message;
  }


  private calculateRandomDelay(): number {
    const min: number = 100;
    const max: number = 500;

    return Math.floor(Math.random() * (max - min)) + min;
  }
}