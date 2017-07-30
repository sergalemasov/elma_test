import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FakeHttpService } from './fakehttp.service';
import { ImgService } from './img.service';

import { IUserlistItem, IRawUserlistItem, IUserDetails } from '../entities';

@Injectable()
export class UserService {

  private avatarsFolder: string;
  private placeholder: string;

  constructor(private http: FakeHttpService, private imgService: ImgService) {
    this.avatarsFolder = 'avatars/';
    this.placeholder = imgService.resolve(this.avatarsFolder + 'placeholder.png');
  }

  public getUserlist(): Observable<IUserlistItem[]> {
    return this.http.get('/users')
      .map((response) => this.convertUserList(response.json()))
      .catch((err: any) => {
        this.logHttpError(err);
        return Observable.of([]);
      });
  }

  public getUserDetails(_id: string): Observable<IUserDetails> {
    return this.http.get('/users/' + _id)
      .map((response) => this.convertUserDetails(response.json()))
      .catch((err: any) => {
        this.logHttpError(err);
        const emptyUserDetails: IUserDetails = {
          _id: '',
          avatar: this.placeholder,
          firstname: 'Unknown',
          surname: 'user',
          about: '',
          age: undefined,
          city: ''
        };
        return Observable.of(emptyUserDetails);
      });
  }

  private convertUserDetails(rawUserListItem: IRawUserlistItem): IUserDetails {
    return {
      _id: rawUserListItem._id,
      avatar: this.convertAvatar(rawUserListItem.avatar),
      firstname: rawUserListItem.firstname,
      surname: rawUserListItem.surname,
      about: rawUserListItem.about,
      age: rawUserListItem.age,
      city: rawUserListItem.city
    };
  }

  private convertUserList(rawUserList: IRawUserlistItem[]): IUserlistItem[] {
    return rawUserList.map((rawUserListItem: IRawUserlistItem): IUserlistItem => {
      return {
        _id: rawUserListItem._id,
        avatar: this.convertAvatar(rawUserListItem.avatar),
        firstname: rawUserListItem.firstname,
        surname: rawUserListItem.surname
      }
    });
  }

  private convertAvatar(rawAvatar: string): string {
    if (rawAvatar) {
      return this.imgService.resolve(this.avatarsFolder + rawAvatar);
    } else {
      return this.placeholder;
    }
  }

  private logHttpError(err: any): void {
    console.log('http error: ', err.status);
  }
};
