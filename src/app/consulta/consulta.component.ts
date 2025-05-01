import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ClienteService} from '../cliente.service';
import {Cliente} from '../cadastro/cliente';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'}
];


@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [MatCardModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    FlexLayoutModule,
    MatInputModule,
    MatButton
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  nomeBusca: string = '';
  colunasTable: string[] = ['id', 'nome', 'dataNascimento', 'email'];
  listaClientes: Cliente[] = [];

  constructor(private service: ClienteService) {
  }

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisaClientes('');
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisaClientes(this.nomeBusca);
    console.log(this.listaClientes,"pesquisa")
  }

}
