const express = require('express');

// const mongoose = require('mongoose');
const router = express.Router();
const enviarEmail = require('../models/email')
const Productos = require('../models/producto')
const app = express();
app.use(express.urlencoded({extended: true}))

// router.get('/', async (req, res) =>{

//     try {
        
//         await Productos.find({},(err, arrayProductos) =>{
//             if(err){
//                 throw new Error('error')
//             }
//             res.render('productos',{arrayProductos})
//         }).lean()
//     } catch (error) {
//         console.log(error)
//     }

    
// })

router.post('/', async (req, res) =>{
    const body = req.body
    //console.log(body)

    try {
        const nuevoProducto= new Productos(body)
        await nuevoProducto.save((error, prod)=>{
            if(error){
                throw new Error(`Ups! surgio un: ${error}`)
            }
            console.log('Nuevo producto agregado con exito!')
            Productos.find({}, (err, arrayProductos)=>{
                if(err){
                    throw new Error('Ocurrio un error:',err)
                }
                if(arrayProductos.length % 10 === 0){
                    enviarEmail(arrayProductos, (error, info) =>{
                        console.log(error, info)
                    })
                    res.redirect('/')
                }
                
            }).lean();
        })
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;