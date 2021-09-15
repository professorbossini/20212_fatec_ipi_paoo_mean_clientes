import { Component } from '@angular/core';
import { Cliente } from './clientes/cliente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  clientes: Cliente[] = []
  onClienteAdicionado (cliente){
    // console.log('Adicionando o cliente: ' + JSON.stringify(cliente))
    this.clientes = [...this.clientes, cliente]
  }
}
