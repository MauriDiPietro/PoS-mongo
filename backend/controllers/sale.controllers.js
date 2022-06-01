import { SaleModel } from "../models/sale.model.js";

export const saveSale = async(req, res) => {
    try {
        const sale = await SaleModel.create(req.body)
        res.json(sale)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getAllSales = async(req, res) => {
    try {
        const sales = await SaleModel.find()
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getSaleById = async(req, res) => {
    const {id} = req.params
    try {
        const sale = await SaleModel.findById(`${id}`)
        res.json(sale)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const updateSale = async(req, res) => {
    const {id} = req.params
    try {
        const sale = await SaleModel.updateOne({_id: id},
                    { 
           $set: {
                    sale: req.body.sale,
                    import: req.body.import,
                    condition: req.body.condition,
                    date: req.body.date,
                    month: req.body.month,
                    year: req.body.year
                }
        }
        )
        res.json(sale)
    } catch (error) {
        res.send({message: error.message});
    }
}


export const getSalesByDate = async(req, res) => {
    const {date} = req.params 
    try {
        const sales = await SaleModel.find({
            date: {
                $eq: `${date}`
            }
        })
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getSalesByMonth = async(req, res) => {
    const {month} = req.params 
    try {
        const sales = await SaleModel.find({
            month: {
                $eq: `${month}`
            }
        })
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getSalesByYear = async(req, res) => {
    const {year} = req.params 
    try {
        const sales = await SaleModel.find({
            year: {
                $eq: `${year}`
            }
        })
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const deleteSale = async(req, res) => {
    const {id} = req.params
    try {
        const sale = await SaleModel.findByIdAndDelete(`${id}`)
        res.json(sale)
    } catch (error) {
        res.send({message: error.message});
    }
}