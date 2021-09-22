import { Injectable } from '@angular/core'
import { Cliente } from './cliente.model'
import { Subject } from 'rxjs'

//observable (Subject): Sofre eventos
//observer: Deseja ficar sabendo dos eventos
//design pattern: Observer

@Injectable ({
    providedIn: 'root'
})
export class ClienteService{
    private listaClientesAtualizada = new Subject <Cliente[]> ()
    private clientes: Cliente[] = []
    
    getClientes(): Cliente[]{
        //operador spread
        return [...this.clientes]
    }

    adicionarCliente (nome: string, fone: string, email: string){
        const cliente: Cliente = {
            nome, fone, email
        }
        this.clientes.push(cliente)
        this.listaClientesAtualizada.next([...this.clientes])
    }

    getListaDeClientesAtualizadaObservable(){
        return this.listaClientesAtualizada.asObservable()
    }
}