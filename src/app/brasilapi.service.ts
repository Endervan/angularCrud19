import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado} from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseURL = 'https://brasilapi.com.br/';
  readonly PATH = 'api/ibge/uf/v1';


  constructor(private http: HttpClient) {
  }

  listarUFs(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseURL + this.PATH);
  }
}
