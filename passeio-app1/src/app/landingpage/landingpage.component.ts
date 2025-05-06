import {Component} from '@angular/core';
import {Profile} from './profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  profile: Profile | undefined;

  constructor(private readonly router: Router) {
  }

  navegar() {
    this.router.navigate(['paginas/galeria'])
  }

  logarComGoogle() {
    if (this.profile) {

    }

  }

  isLoggedIn(): boolean {
    return !!this.profile;
  }

}
