import { serve } from '@hono/node-server'
import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { userRoute } from './handler/route/users/route.js'

export const app = new OpenAPIHono()

app
  .route('/users', userRoute)
  .doc('/spec', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'My API',
    },
  })
  .get(
    '/doc',
    swaggerUI({
      url: '/spec',
    }),
  )

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })
