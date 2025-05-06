import {Component} from '@angular/core';
import {Profile} from './profile';
import {Router} from '@angular/router';
import {AuthgoogleService} from '../authgoogle.service';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss'
})
export class LandingpageComponent {

  profile: Profile | undefined;

  constructor(private readonly router: Router,
              private readonly loginServ: AuthgoogleService) {
  }

  navegar() {
    this.router.navigate(['paginas/galeria'])
  }

  logarComGoogle() {
    if (this.profile) {
      this.loginServ.login();
    }

  }

  isLoggedIn(): boolean {
    this.profile = this.loginServ.getLoggedProfile();
    return !!this.profile;
  }

}
