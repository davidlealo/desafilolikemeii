//Importar e iniciar Express
const express = require('express')
const app = express()

//Importar cors
const cors = require('cors')

//Importar funciones de consultas.js
const {leerPost, agregarPost} = require('./consultas')

//Iniciar cors
app.use(cors())

//Iniciar MW json
app.use(express.json())

//Iniciar servidor
app.listen(3000, ()=> console.log('Servidor iniciado en el puerto 3000'))


//Función asincrona get
app.get('/posts', async (req, res) =>{
    const result = await leerPost()
    res.json(result)
})

//Agregar post
app.post('/posts', async (res, req) =>{
    const { titulo, url, descripcion } = req.body
    await agregarPost(titulo, url, descripcion)
    res.json('')
})


