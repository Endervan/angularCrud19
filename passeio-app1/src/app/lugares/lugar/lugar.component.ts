import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Categoria} from '../../categorias/categoria';
import {CategoriaService} from '../../categorias/categoria.service';
import {LugaresService} from '../lugares.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private readonly categoriaServ: CategoriaService, private readonly service: LugaresService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    })
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.service.salvar(this.camposForm.value).subscribe({
        next: lugar => {
          this.camposForm.reset();
          console.log("lugar criado com sucesso", lugar)
        },
        error: err => console.error(err)
      })
    }
  }

  isCampoValido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.touched && campo?.errors?.['required'];
  }

  ngOnInit(): void {
    this.categoriaServ.obterTodas().subscribe({
      next: listaCategorias => this.categorias = listaCategorias,
      error: err => console.error(err)
    })
  }
}
