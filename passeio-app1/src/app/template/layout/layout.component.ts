import {Component, OnInit} from '@angular/core';
import {Layoutprops} from './layoutprops';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map} from 'rxjs';
import {AuthgoogleService} from '../../authgoogle.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  props: Layoutprops = {titulo: '', subTitulo: ''};

  constructor(private readonly router: Router,
              private readonly activatedRoute: ActivatedRoute,
              private readonly loginService: AuthgoogleService) {
  }

  ngOnInit(): void {
    // obter eventos ao troca de rotas
    this.router.events
      .pipe(
        filter(() => this.activatedRoute !== null),
        map(() => this.obterPropiedadesLayout())
      ).subscribe((props: Layoutprops) => this.props = props)
  }

  // pega valores rotas filhas no data
  obterPropiedadesLayout(): Layoutprops {
    let rotasFilhas = this.activatedRoute.firstChild;
    while (rotasFilhas?.firstChild) {
      rotasFilhas = rotasFilhas.firstChild
    }
    return rotasFilhas?.snapshot.data as Layoutprops;
  }

  logout() {
    this.loginService.logout();
  }
}
