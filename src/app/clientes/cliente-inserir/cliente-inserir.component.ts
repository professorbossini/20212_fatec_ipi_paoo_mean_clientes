import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Cliente } from "../cliente.model";

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent{

    @Output() clienteAdicionado  = new EventEmitter<Cliente>();

    onAdicionarCliente(form: NgForm){
        if (form.invalid) return
        console.log(form)
        const cliente: Cliente = {
            nome: form.value.nome,
            fone: form.value.fone,
            email: form.value.email 
        }
        this.clienteAdicionado.emit(cliente)
    }

}

