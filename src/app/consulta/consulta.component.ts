import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-consulta',
  imports: [MatCardModule, FormsModule, MatTableModule, MatIconModule, FlexLayoutModule, MatInputModule, MatButton],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {

}
