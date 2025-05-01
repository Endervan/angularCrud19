import {Component, inject, OnInit} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Cliente} from './cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BrasilapiService} from '../brasilapi.service';
import {Estado, Municipio} from '../brasilapi.models';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  estados: Estado[] = []
  municipios: Municipio[] = []
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(private service: ClienteService,
              private route: ActivatedRoute,
              private brasilApiServ: BrasilapiService,
              private router: Router) {
  }

  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente(); // instanciando novo cliente e limpando formulario
      this.mostraMessage('Salvo com sucessso')
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostraMessage('Atualizado com sucessso')
    }

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) { // atualizando
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }
      }
    });
    this.carregarUFs();
  }

  carregarUFs() {
    this.brasilApiServ.listarUFs().subscribe({
      next: listaEstados => console.log(listaEstados),
      error: erro => console.error(erro)
    });
  }

  limpar() {
    this.cliente = Cliente.newCliente();
  }

  mostraMessage(mensagem: string) {
    this.snack.open(mensagem, 'OK',)
  }
}
