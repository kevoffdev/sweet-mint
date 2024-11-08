import { Router } from 'express'
import { OrdersModel } from '../controllers/orders.js'

export const orderRouter = Router()

orderRouter.post('/', OrdersModel.createOrder)
orderRouter.delete('/:id', OrdersModel.deleteOrder)
orderRouter.patch('/:id', OrdersModel.updateOrder)
orderRouter.get('/', OrdersModel.getOrders)
orderRouter.get('/:order_id', OrdersModel.getOrderItems)
orderRouter.get('/all/data', OrdersModel.getOrderAllItems)
