import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

// @desc   Create new order
// @route  POST /products
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
});


// @desc   Get order by id
// @route  GET /orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
        if(order){
            res.json(order)
        }else{
            res.status(404);
            throw new Error('Order not found')
        }
});


// @desc   Update order to paid
// @route  PUT /orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid =  true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updateOrder = await order.save();
        res.json({updateOrder});
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});


// @desc   Get logged in user orders
// @route  GET /orders/myOrders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user : req.user._id});
        res.json(orders);
});


// @desc   Get all orders by admin
// @route  GET /orders/
// @access  Private/admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    if(orders){
        res.json(orders)
    }else{
        res.status(404);
        throw new Error('No orders')
    }
});

// @desc   Update order to deliverd
// @route  PUT /orders/:id/deliver
// @access  Private
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
        order.isDelivered =  true;
        order.deliveredAt = Date.now();
        const updateOrder = await order.save();
        res.json(updateOrder);
    }else{
        res.status(404);
        throw new Error("User not found")
    }
});


export {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDeliverd};