require('dotenv').config()
const Cliente = require ('./models/cliente')
const mongoose = require ('mongoose')
const express = require ('express')
const app = express()
app.use(express.json())
const cors = require ('cors')
app.use(cors())


const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_ADDRESS, MONGODB_DATABASE } = process.env


mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.${MONGODB_ADDRESS}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() => console.log("Conexão OK"))
.catch((e) => console.log ("Conexão NOK: " + e))




//GET localhost:3000/api/clientes
app.get ('/api/clientes', (req, res) => {
    Cliente.find()
    .then((documents) => {
        console.log(documents)
        res.status(200).json({
            clientes: documents,
            mensagem: "Tudo OK" 
        })
    })
})

app.get('/api/clientes/:id', (req, res) => {
    Cliente.findById(req.params.id)
    .then(cli => {
        if (cli)
            res.status(200).json(cli)
        else
            res.status(404).send({mensagem: "Cliente não encontrado!"})
    })
})

//POST localhost:3000/api/clientes
app.post('/api/clientes', (req, res) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    })
    cliente.save()
    .then((clienteInserido) => {
        console.log(cliente)
        res.status(201).json({
            mensagem: "Cliente inserido",
            id: clienteInserido._id
        })
    })
})

app.put('/api/clientes/:id/', (req, res) => {
    const cliente = new Cliente({
        _id: req.params.id,
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    })

    Cliente.updateOne(
        {_id: req.params.id}, 
        cliente
    )
    .then((resultado) => {
        console.log(resultado)
        res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
    })

})

//DELETE localhost:3000/api/clientes/123456
//DELETE localhost:3000/api/clientes/abc
app.delete('/api/clientes/:id', (req, res) => {
    // DELETE FROM tb_clientes WHERE id = 123456
    Cliente.deleteOne({_id: req.params.id})
    .then((resultado) => {
        console.log (resultado)
        res.status(200).json({mensagem: 'Cliente removido'})
    })
})





module.exports = app