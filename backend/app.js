const express = require ('express')
const app = express()
const cors = require ('cors')
app.use(cors())

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

//middleware
app.use((req, res, next) => {
    console.log ("Chegou uma requisição")
    next()
})

//GET localhost:3000/api/clientes
app.get ('/api/clientes', (req, res) => {
    res.status(200).json({
        clientes,
        mensagem: "Tudo OK" 
    })
})



module.exports = app