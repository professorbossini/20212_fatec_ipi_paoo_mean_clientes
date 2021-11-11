import { Cliente } from './cliente.model'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators'

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
    
    // {_id: 1, nome: 'Joao', email: 'joao@email.com', fone: '123456'} => {id: 1, nome: 'Joao', email: 'joao@email.com', fone: '123456'}
    getClientes(): void{
        this.httpClient.get<{mensagem: string, clientes: any}>('http://localhost:3000/api/clientes')
        .pipe(map((dados) => {
            return dados.clientes.map(cliente => {
                return {
                    id: cliente._id,
                    nome: cliente.nome,
                    fone: cliente.fone,
                    email: cliente.email
                }
            })
        }))
        .subscribe(clientes => {
            this.clientes = clientes
            this.listaClientesAtualizada.next([...this.clientes])
        })
    }

    adicionarCliente (nome: string, fone: string, email: string){
        const cliente: Cliente = {
            nome, fone, email
        }
        this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/clientes', cliente)
        .subscribe(dados => {
            console.log(dados.mensagem)
            cliente.id = dados.id
            this.clientes.push(cliente)
            this.listaClientesAtualizada.next([...this.clientes])
        })
    }

    getCliente (idCliente: string) {
        //return {...this.clientes.find(cli => cli.id === idCliente)}
        return this.httpClient.get<{_id: string, nome: string, fone: string, email: string}>
        (`http://localhost:3000/api/clientes/${idCliente}`)
    }

    atualizarCliente (id: string, nome: string, fone: string, email: string){
        const cliente: Cliente ={
            id, nome, fone, email
        }
        this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
        .subscribe(res => {
            const copia = [...this.clientes];
            const indice = copia.findIndex(cli => cli.id === cliente.id)
            copia[indice] = cliente
            this.clientes = copia
            this.listaClientesAtualizada.next([...this.clientes])
        })
    }

    removerCliente (id: string): any{
        this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`)
        .subscribe(
            () =>{
                this.clientes = this.clientes.filter(cli => cli.id !== id)
                this.listaClientesAtualizada.next([...this.clientes])
            }
        )
    }

    getListaDeClientesAtualizadaObservable(){
        return this.listaClientesAtualizada.asObservable()
    }
}