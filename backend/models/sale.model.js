import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    sale:{
        type: String,
        
        trim: true
    },
    ing: {
        type: Number,
        trim: true
    },
    egr: {
        type: Number,
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
