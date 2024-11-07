import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({
    id: z.string().uuid().openapi({
      example: '778e7155-798c-4f06-ba52-e93535a60069',
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    email: z.string().email().openapi({
      example: 'john_doe@example.com',
    }),
    createdAt: z.date().openapi({
      example: '2024-11-04T10:59:02.136Z',
    }),
    updateddAt: z.date().openapi({
      example: '2024-11-04T10:59:02.136Z',
    }),
  })
  .openapi('User')

export const UserListSchema = z.array(UserSchema)
