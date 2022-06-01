import express from 'express';
const router = express.Router();
import {saveSale, getAllSales, getSalesByDate, getSalesByMonth, getSalesByYear, getSaleById, updateSale, deleteSale} from '../controllers/sale.controllers.js';

router.post('/', saveSale);
router.get('/', getAllSales);
router.get('/date/:date', getSalesByDate);  //por fecha completa dd-mm-aaaa
router.get('/month/:month', getSalesByMonth);   //por mes
router.get('/year/:year', getSalesByYear);  //por año
router.get('/byid/:id', getSaleById)
router.put('/:id', updateSale)
router.delete('/:id', deleteSale)

export default router;