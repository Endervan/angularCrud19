import {AuthConfig} from 'angular-oauth2-oidc';


export const auth: AuthConfig = {
  issuer: 'https://accounts.google.com', // verifique se token criado na cloud do google e valida
  redirectUri: window.location.origin,
  clientId: '1005902843276-3rv8jpop9pe6m64jm8bhav429q6ofgii.apps.googleusercontent.com', // id projeto passeio app criado cloud do google
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false

}
