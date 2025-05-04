import {Component, OnInit} from '@angular/core';
import {Lugar} from '../../lugares/lugar/lugar';
import {Categoria} from '../../categorias/categoria';
import {LugaresService} from '../../lugares/lugares.service';
import {CategoriaService} from '../../categorias/categoria.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categorias: Categoria[] = [];

  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(private readonly lugarServ: LugaresService, private readonly categoriaServ: CategoriaService) {
  }

  ngOnInit(): void {

    this.categoriaServ.obterTodas().subscribe({
      next: categorias => this.categorias = categorias,
      error: err => console.error(err)
    });

    this.lugarServ.obterTodas().subscribe({
      next: lugares => this.lugares = lugares,
      error: err => console.error(err)
    })
  }

  getTotalEstrelas(lugar: Lugar): string {
    return '&#9733'.repeat(<number><unknown>lugar.avaliacao || 0) + '&#9734'.repeat(5 - (<number><unknown>lugar.avaliacao || 0))
  }

  filtar() {
    this.lugarServ.filtar(this.nomeFiltro, this.categoriaFiltro).subscribe({
      next: resultados => this.lugares = resultados,
      error: err => console.error(err)
    })
  }


}
