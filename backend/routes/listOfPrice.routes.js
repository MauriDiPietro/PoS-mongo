import express from 'express';
const router = express.Router();
import {saveProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/product.controllers.js';

router.post('/', saveProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router;