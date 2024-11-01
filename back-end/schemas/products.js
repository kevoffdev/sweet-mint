import { z } from 'zod'

export const productCreateSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required'
    }),
    price: z.number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required'
    }).positive({ message: 'Price must be a positive number' }),
    category: z.string({
      invalid_type_error: 'Category must be a string',
      required_error: 'Category is required'
    }),
    type: z.string({
      invalid_type_error: 'Type must be a string',
      required_error: 'Type is required'
    }),
    image: z.string({
      invalid_type_error: 'Image URL must be a string',
      required_error: 'Image URL is required'
    }), // .url({ message: 'Image URL must be a valid URL' })

    quantity: z.number({
      invalid_type_error: 'Quantity must be a number',
      required_error: 'Quantity is required'
    }).int({ message: 'Quantity must be an integer' }).nonnegative({ message: 'Quantity cannot be negative' })
  })
})

export const updateProductSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Title must be a string'
    }).optional(),
    price: z.number({
      invalid_type_error: 'Price must be a number'
    }).positive({ message: 'Price must be a positive number' }).optional(),
    category: z.string({
      invalid_type_error: 'Category must be a string'
    }).optional(),
    type: z.string({
      invalid_type_error: 'Type must be a string'
    }).optional(),
    image: z.string({
      invalid_type_error: 'Image URL must be a string'
    })
    // .url({ message: 'Image URL must be a valid URL' })
      .optional(),
    quantity: z.number({
      invalid_type_error: 'Quantity must be a number'
    }).int({ message: 'Quantity must be an integer' }).nonnegative({ message: 'Quantity cannot be negative' }).optional()
  }),
  params: z.object({
    id: z.string({ required_error: 'The value must be a number' })
  })
})

export const deleteProductSchema = z.object({
  params: z.object({
    id: z.string({
      invalid_type_error: 'ID must be a string',
      required_error: 'ID is required'
    }).uuid({ message: 'ID must be a valid UUID' }) // Si usas UUID, de lo contrario puedes usar .int() o .string() dependiendo del tipo de ID que uses.
  })
})
