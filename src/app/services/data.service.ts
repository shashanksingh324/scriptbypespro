import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpService
  ) { }

  getData(data: number = 100) {
    const filter = `results=${data}`;
    return this.http.getAll('api', filter);
  }
}
