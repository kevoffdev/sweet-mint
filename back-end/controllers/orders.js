import { connection } from '../database/databaseConfig.js'

export class OrdersModel {
  static async createOrder (req, res) {
    const { userId, totalAmount, items } = req.body
    if (!userId || !items || items.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: 'User ID and order items are required'
      })
    }

    try {
    //   Insertar el pedido en la tabla `orders`
      await connection.query(`
        INSERT INTO orders (user_id, total_amount) VALUES (UUID_TO_BIN(?), ?);
      `, [userId, totalAmount])

      const [result] = await connection.query(`
        SELECT BIN_TO_UUID(order_id) AS order_id
        FROM orders
        WHERE user_id = UUID_TO_BIN(?)
        ORDER BY order_id DESC
        LIMIT 1;
      `, [userId])
      console.log(result)
      // Aquí tienes el UUID de la orden
      // Insertar cada producto en la tabla `order_items`
      //   const orderItemsPromises = items.map(item => {
      //     return connection.query(`
      //           INSERT INTO order_items (order_id, product_id, quantity, price)
      //           VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?);
      //         `, [orderId, item.productId, item.quantity, item.price])
      //   })
      const orderId = result[0]?.order_id
      console.log(result)
      console.log('oderId', orderId)
      // Reducir la cantidad de producto en la tabla `products`
      const orderItemsPromises = items.map(async (item) => {
        // Insertar el producto en la tabla `order_items`
        await connection.query(`
          INSERT INTO order_items (order_id, product_id, quantity, price)
          VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?);
        `, [orderId, item.productId, item.quantity, item.price])

        // Reducir la cantidad de producto en la tabla `products`
        await connection.query(`
          UPDATE products 
          SET quantity = quantity - ? 
          WHERE BIN_TO_UUID(id) = ?;
        `, [item.quantity, item.productId])
      })

      await Promise.all(orderItemsPromises)

      return res.status(201).json({
        ok: true,
        msg: 'Order created successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async getOrders (req, res) {
    try {
      const [orders] = await connection.query(`
        SELECT BIN_TO_UUID(order_id) AS order_id, BIN_TO_UUID(user_id) as user_id, order_date, status, total_amount
        FROM orders;
      `)
      console.log(orders)
      return res.status(200).json({
        ok: true,
        orders,
        msg: 'Orders retrieved successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async getOrderItems (req, res) {
    const { order_id: orderId } = req.params
    try {
      // Consulta para obtener los productos de un pedido específico
      const [orderItems] = await connection.query(`
        SELECT 
          BIN_TO_UUID(o.order_id) AS order_id,
          BIN_TO_UUID(p.id) AS product_id,
          p.title,
          p.price,
          oi.quantity
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        JOIN orders o ON oi.order_id = o.order_id
        WHERE o.order_id = UUID_TO_BIN(?);
      `, [orderId])
      if (orderItems.length === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'No items found for this order'
        })
      }

      return res.status(200).json({
        ok: true,
        items: orderItems,
        msg: 'Order items retrieved successfully'
      })
    } catch (error) {
      console.error('Error fetching order items:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async getOrderAllItems (req, res) {
    try {
      // Consulta para obtener los productos de un pedido específico
      const [orderItems] = await connection.query(`
      SELECT 
          BIN_TO_UUID(o.order_id) AS order_id,
          BIN_TO_UUID(p.id) AS product_id,
          p.title,
          p.price,
          oi.quantity
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        JOIN orders o ON oi.order_id = o.order_id;
      `)
      console.log(orderItems)
      if (orderItems.length === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'No items found for this order'
        })
      }

      return res.status(200).json({
        ok: true,
        items: orderItems,
        msg: 'Order items retrieved successfully'
      })
    } catch (error) {
      console.error('Error fetching order items:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async deleteOrder (req, res) {
    const { id } = req.params

    try {
      const [result] = await connection.query(`
        DELETE FROM orders WHERE BIN_TO_UUID(order_id) = ?;
      `, [id])

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'Order not found'
        })
      }

      return res.status(200).json({
        ok: true,
        msg: 'Order deleted successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }

  static async updateOrder (req, res) {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        ok: false,
        msg: 'Status is required'
      })
    }

    try {
      const [result] = await connection.query(`
        UPDATE orders SET status = ? WHERE BIN_TO_UUID(order_id) = ?;
      `, [status, id])

      if (result.affectedRows === 0) {
        return res.status(404).json({
          ok: false,
          msg: 'Order not found'
        })
      }

      return res.status(200).json({
        ok: true,
        msg: 'Order status updated successfully'
      })
    } catch (error) {
      console.error('Model Error:', error)
      return res.status(500).json({
        ok: false,
        msg: 'Internal server error'
      })
    }
  }
}
