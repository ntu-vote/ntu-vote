import { Next } from 'koa'

export const authMiddleware = async (
  ctx: {
    [key: string]: any
  },
  next: Next
) => {
  //validate session
 await next()
}