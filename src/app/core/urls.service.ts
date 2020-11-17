import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  public get baseUrl() {
    return 'http://localhost:5001/ehopital-3114f/us-central1/app';
  }
  constructor() { }
}
