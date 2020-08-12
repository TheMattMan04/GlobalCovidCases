import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Cases } from '../models/cases.model';

@Injectable({
  providedIn: 'root'
})
export class CasesService {
  private url = environment.api;

  constructor(private http: HttpClient) {}

  public getConfirmedCases(country: string): Observable<Cases[]> {
    return this.http.get<Cases[]>(this.url + `total/dayone/country/${country}`);
  }

  public getRecoveredCases(country: string): Observable<Cases[]> {
    return this.http.get<Cases[]>(this.url + `country/${country}/status/recovered/live`);
  }

  public getDeaths(country: string): Observable<Cases[]> {
    return this.http.get<Cases[]>(this.url + `country/${country}/status/recovered/live`);
  }

}
