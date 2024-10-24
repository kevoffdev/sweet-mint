import { Router } from 'express'
import { ProductsModel } from '../controllers/products'

export const productsRouter = Router()

productsRouter.get('/', ProductsModel.getProducts)
productsRouter.post('/', ProductsModel.createProducts)
productsRouter.delete('/:id', ProductsModel.deleteProduct)
productsRouter.patch('/:id', ProductsModel.updateProduct)
