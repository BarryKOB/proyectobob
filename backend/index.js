// Importa las funciones de `services/index.js`
const { getData, insertData, deleteData, insertDataU, getDataU, getDataP} = require('./services/items');

//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port  = 3030

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())



//Ejemplo para ver cómo funciona un endpoint:
//este endpoint / y devuelve un mensaje
app.get('/', function (req, res) {
    res.json({message: 'Adios Mundo!'})
})

//Creación del endpoint: /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function(req, res, next) {
    console.log(req.query)
    console.log(req.query.user)
    console.log(req.query.password)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)

app.get('/addItem',async function(req,res,next) {
    try {
        res.json(await insertData(req))
    }catch(err) {
        console.error('Error while inserting items',err)
        next(err);
    }
})

app.get('/getItems',async function(req,res,next) {
    try {
        res.json(await getData(req))
    }catch(err) {
        console.error('Error while gettins items',err)
        next(err);
    }
})

app.get('/deleteItem',async function(req,res,next) {
    try {
        res.json(await deleteData(req))
    }catch(err) {
        console.error('Error while deleting items',err)
        next(err);
    }
})

app.get('/updateItem',async function(req,res,next) {
    try {
        res.json(await updateData(req))
    }catch(err) {
        console.error('Error while deleting items',err)
        next(err);
    }
})

app.get('/addItemU',async function(req,res,next) {
    try {
        res.json(await insertDataU(req))
    }catch(err) {
        console.error('Error while inserting items',err)
        next(err);
    }
})

app.get('/getItemsU',async function(req,res,next) {
    try {
        res.json(await getDataU(req))
    }catch(err) {
        console.error('Error while gettins items',err)
        next(err);
    }
})

app.get('/getItemsP',async function(req,res,next) {
    try {
        res.json(await getDataP(req))
    }catch(err) {
        console.error('Error while gettins items',err)
        next(err);
    }
})