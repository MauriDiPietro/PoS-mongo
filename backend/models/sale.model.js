import mongoose from 'mongoose';


const fechaCompleta = new Date()
const month = fechaCompleta.getMonth()+1
const year = fechaCompleta.getFullYear()
const day = fechaCompleta.getDate()
const fechaActual = (`${year}-${month}-${day}`)

const Schema = new mongoose.Schema({
    sale:{
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        lowercase: true,
        trim: true
    },
    date: {
        type: String
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    }
},
{
    timestamps: true
}
);

export const SaleModel = mongoose.model('Sales', Schema);
