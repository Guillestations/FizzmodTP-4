const express = require('express');
const fs = require('fs')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Productos = require('./models/producto')
const enviarEmail = require('./models/email')
const validarEmail = require('./models/validar')

require('dotenv').config();

const app = express();
const PORT =  process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.urlencoded({ extended: false }))

// app.use(bodyParser.json())


/**CONEXION A BASES DE DATOS */
const mongoose = require('mongoose'); 


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@trabajos-fizzmod.pxwwr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;



app.use(express.static( "public"))

/**Motor de plantilla */

app.set('view engine', 'ejs');
app.set('views', './views')
 


//app.use('/', require('./router/Email'));
//app.use('/productos', require('./router/Productos'));
//app.use('/inicio',require('./router/Productos'));

app.get('/productos', (req, res) =>{

    
    Productos.find({},(err, arrayProductos) =>{
        if(err){
            throw new Error('error')
            console.log('estoas atascado aqui')
        }
        res.render('productos',{arrayProductos})
    })


})


app.get('/set-correo', (req,res) =>{
    res.sendFile(process.cwd() + '/public/email.html')
})


app.post('/', (req, res) =>{
    const body = req.body
    //console.log(body)
   
        const nuevoProducto= new Productos(body)
        nuevoProducto.save((error, prod)=>{
            if(error){
                throw new Error(`Ups! surgio un: ${error}`)
            }
            console.log('Nuevo producto agregado con exito!')

            Productos.find({}, (err, arrayProductos)=>{
                if(err){
                    res.send(prod)
                    throw new Error('Ocurrio un error:',err)
                }
                if(arrayProductos.length % 10 === 0){
                    console.log('estoy aqui antes de enviar el email')
                    enviarEmail(arrayProductos, (err, info)=>{
                        console.log(err,info)
                        res.redirect('/')
                    })
                   
                    res.redirect('/')
                }
                
            }).lean();
        })
        res.redirect('/')
})




app.post('/set-correo', (req, res) =>{
    const Email = req.body.email;

    console.log(Email)
    if(!validarEmail(Email)){
        res.send(`El email "${Email}" no es valido. Ingrese otro`)
        res.redirect('/set-correo')
    }
    fs.writeFile('correo.dat', Email, error =>{
        if(error) throw new Error(`Ocurrio un error en la escritura de tu email: ${error}`)
        res.redirect('/')
    })
     
})


/**Redirecciono a Pagina de error 404 siempre y cuando no encuentre una ruta configurada */
app.use((req, res, next)=> {
    res.status(404).render("404", {
        titulo : "404 Upss...! no se encontro lo que esperaba.",
        descripcion : "Titulo del sitio web 404"
    })
})



mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, err =>{
    if(err) throw new Error(`Error de conexión en la base de datos: ${err}`)
    console.log('Base de datos conectada!')
    const server = app.listen(PORT, () =>{
        console.log('Servidor corriendo en el puerto:',PORT)
    })
    server.on('error', error => console.log(`Error en Servidor: ${error}`))
})
