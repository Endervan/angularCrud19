import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ClienteService} from '../cliente.service';
import {Cliente} from '../cadastro/cliente';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


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
  colunasTable: string[] = ['id', 'nome', 'dataNascimento', 'email', 'acoes'];
  listaClientes: Cliente[] = [];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {
  }

  ngOnInit(): void {
    this.listaClientes = this.service.pesquisaClientes('');
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisaClientes(this.nomeBusca);
    console.log(this.listaClientes, "pesquisa")
  }

  editar(id: string) {
    this.router.navigate(['/cadastro'], {queryParams: {'id': id}})
  }

  prepararDelete(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisaClientes('');
    this.mostraMessage('deletado com sucessso')
  }

  mostraMessage(mensagem:string){
    this.snack.open(mensagem,'OK',)
  }
}
