const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData (req, res) {
 const data = req.query

 const query = `insert into coleccion(nombre,marca,tipo,precio) values(?,?,?,?)`
 const values = [data.nombre, data.marca, data.tipo, data.precio];
 const result = await db.query(query,values)
 return result.affectedRows
}
async function getData (req, res) {
    const rows = await db.query(
    `Select * from coleccion`
   )
   const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

async function deleteData (req, res) {
    const data = req.query
    const result = await db.query(
    `Delete from coleccion where id = ${data.id}`
    )
    return result.affectedRows
}



async function updateData (req, res) {
    const data = req.query
   
    const query = `UPDATE coleccion SET nombre = ?, marca = ?, tipo = ?, precio = ? WHERE id = ?`;
    const values = [data.nombre, data.marca, data.tipo, data.precio, data.id];
    const result = await db.query(query,values)
    return result.affectedRows
}

async function insertDataU (req, res) {
    const data = req.query
   
    const query = `insert into usuarios(nombre,login,password,rol) values(?,?,?,?)`
    const values = [data.nombre, data.login, data.password, data.rol];
    const result = await db.query(query,values)
    return result.affectedRows
   }

   async function getDataU (req, res) {
    const rows = await db.query(
    `Select * from usuarios`
   )
   const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

module.exports = {
getDataU,
getData,
insertData,
deleteData,
insertDataU,

}

