const express = require('express');
const router = express.Router();

const Productos = require('../models/producto')

router.get('/', async (req, res) =>{

    try {
        const arrayProductos = await Productos.find();
        console.log(arrayProductos)

        res.render("productos",{

            arrayProductos : arrayProductos
            
        })
    } catch (error) {
        console.log(error)
    }

    
})

router.post('/', async (req, res) =>{
    const body = req.body
    console.log(body)
    try {
        const newProducto= new Productos(body)
        await newProducto.save()
        res.redirect('/productos')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;