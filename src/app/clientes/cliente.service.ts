import { Cliente } from './cliente.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'

//observable (Subject): Sofre eventos
//observer: Deseja ficar sabendo dos eventos
//design pattern: Observer

@Injectable ({
    providedIn: 'root'
})
export class ClienteService{

    constructor (private httpClient: HttpClient){

    }

    private listaClientesAtualizada = new Subject <Cliente[]> ()
    private clientes: Cliente[] = []
    
    getClientes(): void{
        this.httpClient.get<{mensagem: string, clientes: Cliente[]}>('http://localhost:3000/api/clientes').subscribe(dados => {
            this.clientes = dados.clientes
            this.listaClientesAtualizada.next([...this.clientes])
        })
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