import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  URL = environment.serverUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(api: any, filter: any) {
    if (filter) {
      api =  `${api}?${filter}`;
    }
    return this.httpClient.get(this.URL + api);
  }

  post<Observable>(api: any, data?: any) {
    return this.httpClient.post(this.URL + api, data);
  }

  patch<Observable>(api: any, data?: any) {
    return this.httpClient.patch(this.URL + api, data);
  }


  put(api: any, data: any) {
    return this.httpClient.put(this.URL + api, data);
  }

  getOne(api: any, recordId: any) {
    const url = this.URL + api + '/' + recordId;
    return this.httpClient.get(url);

  }

  delete(api: any, recordId: any) {
    return this.httpClient.delete(this.URL + api + '/' + recordId);
  }
}
