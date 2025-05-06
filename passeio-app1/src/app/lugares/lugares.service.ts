import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lugar} from './lugar/lugar';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  apiUrl: string = environment.apiUrl + '/lugares';

  constructor(private readonly http: HttpClient) {
  }

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar)
  }

  obterTodas(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl)
  }

  filtar(nome: string, categoria: string): Observable<Lugar[]> {
    let parametros = new HttpParams();

    if (nome) {
      parametros = parametros.set('nome_like', nome)
    }

    if (categoria && categoria !== '-1') {
      parametros = parametros.set('categoria', categoria)
    }
    return this.http.get<Lugar[]>(this.apiUrl, {
        params: parametros
      }
    )
  }
}
