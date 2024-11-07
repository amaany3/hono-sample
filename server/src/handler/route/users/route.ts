import { OpenAPIHono } from '@hono/zod-openapi'
import { createUser } from './create.js'
import { deleteUser } from './delete.js'
import { getUser } from './get.js'
import { listUser } from './list.js'
import { updateUser } from './update.js'

export const userRoute = new OpenAPIHono()

userRoute.openapi(createUser.route, createUser.handler)
userRoute.openapi(getUser.route, getUser.handler)
userRoute.openapi(listUser.route, listUser.handler)
userRoute.openapi(deleteUser.route, deleteUser.handler)
userRoute.openapi(updateUser.route, updateUser.handler)
