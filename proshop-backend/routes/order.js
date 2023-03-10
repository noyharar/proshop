import express from "express";
var router = express.Router();
import { addOrderItems , getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDeliverd} from "../controllers/orderController.js";
import {protect, admin} from "../Middlewares/authMiddleware.js";

router.route('/').post(protect, addOrderItems)
    .get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin,updateOrderToDeliverd);






export default router;
