import { type RouteHandler, z } from '@hono/zod-openapi'
import { createRoute } from '@hono/zod-openapi'
import { prisma } from '../../../infra/db.js'
import { UserListSchema } from '../../schema/user.js'

const route = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserListSchema,
        },
      },
      description: 'list user',
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
  try {
    const users = await prisma.users.findMany({})
    const resp = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.created_at,
      updateddAt: user.updated_at,
    }))
    return c.json(resp, 200)
  } catch (e) {
    return c.json({ message: 'Internal Server Error' }, 500)
  }
}

export const listUser = { route, handler }
