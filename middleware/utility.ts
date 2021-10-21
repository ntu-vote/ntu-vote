import { ParameterizedContext, Next } from 'koa'
import path from 'path'
import bodyparser from 'koa-bodyparser'
import koaStatic from 'koa-static'
import session from 'koa-generic-session'
import redisStore from 'koa-redis'

import config from '../config'

export const staticMiddleware = koaStatic(path.join(process.cwd(), '/public'))

export const sessionMiddleware = session({
  key: 'site-name',
  rolling: true,
  store: config.sessionStore
    ? redisStore({
        host: 'localhost',
      })
    : null,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    sameSite: 'strict',
    signed: false,
  },
})

export const parserMiddleware = bodyparser({
  enableTypes: ['json', 'form', 'text'],
  formLimit: '50kb',
  jsonLimit: '50kb',
})

export const loggerMiddleware = async (
  ctx: ParameterizedContext,
  next: Next
) => {
  if (config.debugMode) {
    const start: any = new Date()
    await next()
    const ms = <any>new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  } else {
    await next()
  }
}
