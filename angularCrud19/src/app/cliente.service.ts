import {Injectable} from '@angular/core';
import {Cliente} from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';
  constructor() {
  }

  salvar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisaClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();
    if (!nomeBusca) {
      return clientes
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);

  }

  buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      return JSON.parse(repositorioClientes);
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente); // substituir cliente antigo c pelo novo (cliente vindo )
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage)); // atualizar storage
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage();
    const novaLista = storage.filter(c => c.id !== cliente.id); // 1 forma deletar cria array novo sem cliente
    // const indexItem = storage.indexOf(cliente); // 2 forma e pegando index
    // if (indexItem > -1) {
    //   storage.splice(indexItem, 1);
    // }
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }
}
