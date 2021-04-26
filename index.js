const express = require('express');

const app = express();

const PORT =  process.env.PORT || 3000;
/**Motor de plantilla */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) =>{
    res.render("index", { titulo : "Mi titulo dinamico"})
})

app.get('/servicios', (req, res) =>{
    res.render("servicios", { tituloServicios : "Mensaje dinamico de servicios"})
})

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