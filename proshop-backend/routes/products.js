import express from "express";
var router = express.Router();
import {getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts} from "../controllers/productController.js";
import {protect, admin} from '../Middlewares/authMiddleware.js'


router.route('/top').get(getTopProducts)
router.route('/').get(getProducts)
    .post(protect,admin,createProduct);
router.route('/:id/review').post(protect,createProductReview)
router.route('/:id').get(getProductById)
    .delete(protect, admin,deleteProduct)
    .put(protect,admin,updateProduct)



export default router;
