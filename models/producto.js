const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    img: String
})

//Creo modelo
const Productos = mongoose.model('Producto', productoSchema);

module.exports = Productos;