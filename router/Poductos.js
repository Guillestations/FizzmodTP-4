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

module.exports = router;