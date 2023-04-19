//Iniciar Express
const express = require('express')
const app = express()

//Importar funciones desde consultas
const { agregarPosts, leerPosts, modificarPosts, borrarPosts } = require('./consultas')

//Uso de cors y otros MW
const cors = require('cors')
app.use(cors())
app.use(express.json())

//Inicio de servidor
app.listen(3000, () => {
    console.log('Servidor funciona en el puerto 3000')
})

app.get('/posts', async (req, res) => {
    const resultado = await leerPosts()
    res.json(resultado)
})


app.post('/posts', async (req, res) => {
    const { titulo, url, descripcion } = req.body
    await agregarPosts(titulo, url, descripcion)
    res.json()
})


app.put('/posts/like/:id', async (req, res) => {
    const { id } = req.params
    await modificarPosts(id)
    res.send('Post modificado en la base de datos')
})

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    await borrarPosts(id)
    res.send('Post eliminado en la base de datos')
})