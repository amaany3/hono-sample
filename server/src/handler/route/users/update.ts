import { type RouteHandler, z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { Prisma } from '@prisma/client'
import { prisma } from '../../../infra/db.js'
import { UserSchema } from '../../schema/user.js'

const paramsSchema = z.object({
  id: z
    .string()
    .uuid()
    .openapi({
      param: { name: 'id', in: 'path' },
      example: '778e7155-798c-4f06-ba52-e93535a60069',
    }),
})

const bodySchema = z.object({
  name: z.string().optional().openapi({
    example: 'John Doe',
  }),
  email: z.string().email().optional().openapi({
    example: 'john_doe@example.com',
  }),
})

const route = createRoute({
  method: 'put',
  path: '/{id}',
  request: {
    params: paramsSchema,
    body: {
      required: true,
      content: {
        'application/json': {
          schema: bodySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'update user',
    },
    404: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'already exist error',
    },
    500: {
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: 'internal server error',
    },
  },
})

const handler: RouteHandler<typeof route> = async (c) => {
  const { id } = c.req.valid('param')
  const { name, email } = c.req.valid('json')

  try {
    const user = await prisma.users.update({
      where: { id },
      data: { name, email },
    })
    return c.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.created_at,
        updateddAt: user.updated_at,
      },
      200,
    )
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') {
        return c.json({ message: 'Not Found' }, 404)
      }
    }
    return c.json({ message: 'Internal Server Error' }, 500)
  }
}

export const updateUser = { route, handler }
