import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  isEmptyOrNull(value: string) {
    if (value == "" || value == null || value == undefined) {
      return true;
    }
    return false;
  }


}
