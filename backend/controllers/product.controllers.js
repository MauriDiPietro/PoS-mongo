import { ProductModel } from "../models/product.model.js";

export const saveProduct = async(req, res) => {
    try {
        const product = await ProductModel.create(req.body)
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getAllProducts = async(req, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getProductById = async(req, res) => {
    const {id} = req.params
    try {
        const product = await ProductModel.findById(`${id}`)
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await ProductModel.updateOne({_id: id},
                    { 
           $set: {
                    name: req.body.name,
                    priceOfBuy: req.body.priceOfBuy,
                    priceOfSale: req.body.priceOfSale,
                    increment: req.body.increment
                }
        }
        )
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}


export const deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await ProductModel.findByIdAndDelete(`${id}`)
        res.send('product deleted')
    } catch (error) {
        res.send({message: error.message});
    }
}