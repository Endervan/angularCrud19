import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {auth} from '../../auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthgoogleService {

  profile = signal<any>(null)
  private readonly oauthSerice: OAuthService = inject(OAuthService);
  private readonly router: Router = inject(Router);

  constructor() {
    this.initConfiguration();
  }


  initConfiguration() {
    this.oauthSerice.configure(auth); // configurando o cliente
    this.oauthSerice.setupAutomaticSilentRefresh(); // verifica se vc ja esta logado no google
    this.oauthSerice.loadDiscoveryDocumentAndLogin().then(() => {
      if (this.oauthSerice.hasValidAccessToken()) {
        this.profile.set(this.oauthSerice.getIdentityClaims()) // dados de autenticacao
      }

    })
  }

  login() {
    this.oauthSerice.initImplicitFlow();
  }

  logout() {
    this.oauthSerice.revokeTokenAndLogout().then();
    this.oauthSerice.logOut();
    this.profile.set(null);
    this.router.navigate(['']).then();
  }

  getLoggedProfile() {
   return  this.profile();
  }
}
