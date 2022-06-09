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
                    ing: req.body.ing,
                    egr: req.body.egr,
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

export const getSalesByProduct = async(req, res) => {
    const {product} = req.params 
    try {
        const sales = await SaleModel.find({
            sale: {
                $eq: `${product}`
            }
        })
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getSalesByCondition = async(req, res) => {
    const {condition} = req.params 
    try {
        const sales = await SaleModel.find({
            condition: {
                $eq: `${condition}`
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

export const getTotalIng = async(req, res)=>{
    const {date} = req.params 
    try {
        const sales = await SaleModel.aggregate([
            {
            $match: {
                date: `${date}`         //matchea con fecha pasada por params
            }
        },
        {
            $group: {
                    _id: '$date', totaling: {$sum: '$ing'}  //suma los campos ing
                }
            }
        ])        
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getTotalEgr = async(req, res)=>{
    const {date} = req.params 
    try {
        const sales = await SaleModel.aggregate([
            {
            $match: {
                date: `${date}`         //matchea con fecha pasada por params
            }
        },
        {
            $group: {
                    _id: '$date', totalegr: {$sum: '$egr'}  //suma los campos ing
                }
            }
        ])        
        res.json(sales)
    } catch (error) {
        res.send({message: error.message});
    }
}

export const getTotal = async(req, res)=>{
    const {date} = req.params 
    try {
       const total = await SaleModel.aggregate([
        {
        $match: {
            date: `${date}`         //matchea con fecha pasada por params
        }
    },
    {
        $group: {
                _id: '$date', 
                totaling: {$sum: '$ing'},
                totalegr: {$sum: '$egr'}, 
            }
            
        }
    ])        
    const ing = total.map(x => x.totaling)
    const egr = total.map(x => x.totalegr)
    res.json(ing - egr)
    } catch (error) {
        res.send({message: error.message});
    }
}