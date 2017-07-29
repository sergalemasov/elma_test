import { Injectable } from '@angular/core';

@Injectable()
export class ImgService {
  private imgPathResolver: any;
  private helperPattern: RegExp;

  constructor() {
    this.imgPathResolver = (<any>require).context('../../assets/img/', true);
    this.helperPattern = new RegExp('^\\.?\\/?(.*)');
  }

  public resolve(imgPath: string) {
    const path: string = imgPath.replace(this.helperPattern, './$1');
    return this.imgPathResolver(path, true);
  }
}