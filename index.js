const express = require('express');
const bodyParser = require('body-parser')
const app = express();

require('dotenv').config();

const PORT =  process.env.PORT || 3001;


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


/**CONEXION A BASES DE DATOS */
const mongoose = require('mongoose');


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@trabajos-fizzmod.pxwwr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))


/**Motor de plantilla */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + "/public"))

app.use('/', require('./router/Rutas'));
app.use('/productos', require('./router/Productos'));
app.use('/inicio',require('./router/Productos'));

/**Redirecciono a Pagina de error 404 siempre y cuando no encuentre una ruta configurada */
app.use((req, res, next)=> {
    res.status(404).render("404", {
        titulo : "404",
        descripcion : "Titulo del sitio webs 404"
    })
})
app.listen(PORT, () =>{
    console.log('Servidor corriendo en el puerto:',PORT)
})