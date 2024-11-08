import { connection } from '../database/databaseConfig.js'

export class ProductsModel {
  static async createProducts (req, res) {
    const { title, price, category, type, image, quantity } = req.body

    try {
      if (!title || !price || !category || !type || !image || quantity === undefined) {
        return res.status(400).json({
          ok: false,
          msg: 'All fields are required'
        })
      }

      await connection.query(`
        INSERT INTO products (title, price, category, type, image, quantity) VALUES (?, ?, ?, ?, ?, ?);`,
      [title, price, category, type, image, quantity]
      )

      return res.status(201).json({
        ok: true,
        msg: 'Product created successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async getProducts (req, res) {
    try {
      const [products] = await connection.query('SELECT BIN_TO_UUID(id) id,title,price,category,type,image,quantity,BIN_TO_UUID(codigo_producto) codigo_producto FROM products;')
      return res.status(200).json({
        ok: true,
        products,
        msg: 'products'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  // Eliminar un producto por ID
  static async deleteProduct (req, res) {
    const { id } = req.params
    try {
      const [result] = await connection.query('DELETE FROM products WHERE BIN_TO_UUID(id) = ?;', [id])

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'Product not found'
        })
      }

      return res.status(200).json({
        ok: true,
        msg: 'Product deleted successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async updateProduct (req, res) {
    const { id } = req.params
    const { title, price, category, type, image, quantity } = req.body
    const fieldsToUpdate = {}
    if (title !== undefined) fieldsToUpdate.title = title
    if (price !== undefined) fieldsToUpdate.price = price
    if (category !== undefined) fieldsToUpdate.category = category
    if (type !== undefined) fieldsToUpdate.type = type
    if (image !== undefined) fieldsToUpdate.image = image
    if (quantity !== undefined) fieldsToUpdate.quantity = quantity

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'At least one field must be updated'
      })
    }
    try {
      const setClause = Object.keys(fieldsToUpdate).map(field => `${field} = ?`).join(', ')
      const values = Object.values(fieldsToUpdate)

      const [result] = await connection.query(
        `UPDATE products SET ${setClause} WHERE BIN_TO_UUID(id) = ?`,
        [...values, id]
      )

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'Product not found'
        })
      }

      return res.status(200).json({
        ok: true,
        msg: 'Product updated successfully'
      })
    } catch (error) {
      console.error('Error updating product:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }
}
