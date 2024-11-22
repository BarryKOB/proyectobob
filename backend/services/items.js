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
   module.exports = {
    getData,
    insertData,
    deleteData
   }

