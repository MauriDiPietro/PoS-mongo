import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    priceOfBuy: {
        type: Number,
        trim: true
    },
    priceOfSale: {
        type: Number,
        trim: true
    },
    increment: {
        type: Number,
        trim: true
    }
},
{
    timestamps: true
}
);

export const ProductModel = mongoose.model('Products', Schema);
