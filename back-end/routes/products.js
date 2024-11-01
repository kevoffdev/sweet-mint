import { Router } from 'express'
import { ProductsModel } from '../controllers/products.js'
import { schemaValidation } from '../middlewares/schemaValidator.js'
import { deleteProductSchema, productCreateSchema, updateProductSchema } from '../schemas/products.js'

export const productsRouter = Router()

productsRouter.get('/', ProductsModel.getProducts)
productsRouter.post('/', schemaValidation(productCreateSchema), ProductsModel.createProducts)
productsRouter.delete('/:id', schemaValidation(deleteProductSchema), ProductsModel.deleteProduct)
productsRouter.patch('/:id', schemaValidation(updateProductSchema), ProductsModel.updateProduct)
