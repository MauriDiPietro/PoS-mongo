import express from 'express';
const router = express.Router();
import {saveSale, getAllSales, getSalesByDate, getSalesByMonth, getSalesByYear, getSaleById, updateSale, deleteSale, getTotalIng, getTotal, getTotalEgr, getSalesByProduct, getSalesByCondition} from '../controllers/sale.controllers.js';

router.post('/', saveSale);
router.get('/', getAllSales);
router.get('/totaling/:date', getTotalIng)     //total ingresos por fecha
router.get('/totalegr/:date', getTotalEgr)     //total egresos por fecha
router.get('/total/:date', getTotal)     //total ventas por fecha
router.get('/date/:date', getSalesByDate);  //por fecha completa dd-mm-aaaa
router.get('/month/:month', getSalesByMonth);   //por mes
router.get('/year/:year', getSalesByYear);  //por año
router.get('/product/:product', getSalesByProduct)
router.get('/condition/:condition', getSalesByCondition)
router.get('/byid/:id', getSaleById)
router.put('/:id', updateSale)
router.delete('/:id', deleteSale)

export default router;