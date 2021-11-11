import { ActivatedRoute, ParamMap } from "@angular/router";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Cliente } from "../cliente.model";
import { ClienteService } from "../cliente.service";

@Component({
    selector: 'app-cliente-inserir',
    templateUrl: './cliente-inserir.component.html',
    styleUrls: ['./cliente-inserir.component.css']
})
export class ClienteInserirComponent implements OnInit{

    constructor (
        private clienteService: ClienteService,
        private route: ActivatedRoute,
    ){

    }

    private modo: string = 'criar'
    private idCliente: string;
    public cliente: Cliente;

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('idCliente')) {
                this.modo = 'editar'
                this.idCliente = paramMap.get('idCliente')
                this.clienteService.getCliente(this.idCliente).subscribe(dadosCli => {
                    this.cliente ={
                        id: dadosCli._id,
                        nome: dadosCli.nome,
                        fone: dadosCli.fone,
                        email: dadosCli.email,
                    }
                })
            }
            else{
                this.modo = 'criar'
                this.idCliente = null
            }
        })
    }

    onSalvarCliente(form: NgForm){
        if (form.invalid) return
        if (this.modo === 'criar'){
            this.clienteService.adicionarCliente(
                form.value.nome,
                form.value.fone,
                form.value.email
            )
        }
        else{
            console.log(form.value.nome)
            this.clienteService.atualizarCliente(
                this.idCliente,
                form.value.nome,
                form.value.fone,
                form.value.email
            )
        }
        form.resetForm()
    }

}

