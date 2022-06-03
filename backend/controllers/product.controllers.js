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
                    product: req.body.product,
                   
                }
        }
        )
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}


export const getProductByDate = async(req, res) => {
    const {date} = req.params 
    try {
        const product = await ProductModel.find({
            date: {
                $eq: `${date}`
            }
        })
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getProductsByMonth = async(req, res) => {
    const {month} = req.params 
    try {
        const product = await ProductModel.find({
            month: {
                $eq: `${month}`
            }
        })
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getProductByYear = async(req, res) => {
    const {year} = req.params 
    try {
        const product = await ProductModel.find({
            year: {
                $eq: `${year}`
            }
        })
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params
    try {
        const product = await ProductModel.findByIdAndDelete(`${id}`)
        res.json(product)
    } catch (error) {
        res.send({message: error.message});
    }
}