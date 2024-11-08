import { Router } from 'express'
// import { schemaValidation } from '../middlewares/schemaValidator.js'
import { OrdersModel } from '../controllers/orders.js'

export const orderRouter = Router()

orderRouter.post('/', OrdersModel.createOrder)
// authRouter.post('/login', schemaValidation(userLoginSchema), UserModel.login)
// authRouter.post('/logout', UserModel.logout)
orderRouter.get('/', OrdersModel.getOrders)
orderRouter.get('/:order_id', OrdersModel.getOrderItems)
orderRouter.get('/all/data', OrdersModel.getOrderAllItems)
