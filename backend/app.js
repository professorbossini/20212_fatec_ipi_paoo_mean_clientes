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


const clientes = [
    {
        id: '1',
        nome: 'José',
        fone: '11223344',
        email: 'jose@email.com'
    },
    {
        id: 2,
        nome: 'Jaqueline',
        fone: '77665588',
        email: 'jaque@email.com'
    },
    {
        id: 3,
        nome: 'João',
        fone: '777887788',
        email: "joao@email.com"
    }
]


//GET localhost:3000/api/clientes
app.get ('/api/clientes', (req, res) => {
    Cliente.find()
    .then((documents) => {
        res.status(200).json({
            clientes: documents,
            mensagem: "Tudo OK" 
        })
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
    console.log(cliente)
    res.status(201).json({mensagem: "Cliente inserido"})
})



module.exports = app