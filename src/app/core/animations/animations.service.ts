import { Injectable } from '@angular/core';

@Injectable()
export class AnimationsService {
  //////////////////////////////

  static _isSiteLoaded = false;

  constructor() {}

  static isSiteLoaded() {
    return this._isSiteLoaded;
  }

  static setSiteLoaded(isSet: boolean) {
    this._isSiteLoaded = isSet;
  }
}
