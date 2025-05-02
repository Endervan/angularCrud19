import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Estado, Municipio} from './brasilapi.models';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  baseURL = 'https://brasilapi.com.br/';


  constructor(private http: HttpClient) {
  }

  listarUFs(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseURL + 'api/ibge/uf/v1');
  }

  listarMunicipio(uf: string): Observable<Municipio[]> {
    const path = 'api/ibge/municipios/v1/' + uf;
    return this.http.get<Municipio[]>(this.baseURL + path);
  }
}
