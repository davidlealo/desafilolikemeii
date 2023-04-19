const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

//Función para agregar post 
const agregarPosts = async (titulo, img, descripcion, likes = 0) => {
    const consulta = 'INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)' 
    const values = [titulo, img, descripcion, likes]
    await pool.query(consulta, values)
    console.log('Post agregado de forma exitosa')
}

//Función para agregar leer post 
const leerPosts = async () => {
    const consulta = 'SELECT * FROM posts'
    const { rows } = await pool.query(consulta)
    return rows
}

const modificarPosts = async (id) => {
    const consulta = "UPDATE posts SET likes = likes + 1 WHERE id = $1"
    const values = [id]
    await pool.query(consulta, values)
}

//Función para borrar post 
const borrarPosts = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE id = $1"
        const values = [id]
        await pool.query(consulta, values)
    }
    catch (error) {
        res.status(500).send('Hola! Tenemos un error acá')
    }
}

module.exports = { agregarPosts, leerPosts, modificarPosts, borrarPosts }