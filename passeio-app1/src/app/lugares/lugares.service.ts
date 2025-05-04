import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lugar} from './lugar/lugar';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(private readonly http: HttpClient) {
  }

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>("http://localhost:3000/lugares", lugar)
  }

  obterTodas(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>('http://localhost:3000/lugares')
  }
}
