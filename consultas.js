const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'likeme',
    allowExitOnIdle: true
})

const agregarPost = async (titulo, img, descripcion, likes = 0) =>{
    const consulta = 'INSERT INTO posts VALUES(DEFAULT, $1, $2, $3, $4)'
    const values = [titulo, img, descripcion, likes]
    await pool.query(consulta, values)
    console.log('Post agregado de forma exitosa!')
}

leerPost = async () =>{
    const consulta = 'SELECT * FROM posts'
    const {rows} = await pool.query(consulta)
    return rows
}

module.exports = {agregarPost, leerPost}