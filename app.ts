import Koa from 'koa'
import json from 'koa-json'
import 'reflect-metadata'
import { createConnection } from 'typeorm'

import {
  staticMiddleware,
  sessionMiddleware,
  parserMiddleware,
  loggerMiddleware,
} from './middleware/utility'

import { authMiddleware } from './middleware/authorization'
import { unprotectedRoutes, protectedRoutes } from './controller/router'
import config from './config'

const app = new Koa()

app.keys = config.sessionKeys

// initialize db
const connectionPromise = createConnection()
Promise.all([connectionPromise]).then(() => {
  //cron jobs here
})

// middlewares
app.use(json())
app.use(staticMiddleware)
app.use(parserMiddleware)
app.use(sessionMiddleware)
app.use(loggerMiddleware)

// app.use(test.routes());

// routes
app.use(unprotectedRoutes())
app.use(authMiddleware)
app.use(protectedRoutes())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

export default app
