import { type RouteHandler, z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { Prisma } from '@prisma/client'
import { prisma } from '../../../infra/db.js'
import { UserSchema } from '../../schema/user.js'

const bodySchema = z.object({
  name: z.string().max(64).openapi({
    example: 'John Doe',
  }),
  email: z.string().email().openapi({
    example: 'john_doe@example.com',
  }),
})

const route = createRoute({
  method: 'post',
  path: '/',
  request: {
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
      description: 'create user',
    },
    409: {
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
  const { name, email } = c.req.valid('json')

  try {
    const user = await prisma.users.create({
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
      if (e.code === 'P2002') {
        return c.json({ message: 'Already Exist' }, 409)
      }
    }
    return c.json({ message: 'Internal Server Error' }, 500)
  }
}

export const createUser = { route, handler }
