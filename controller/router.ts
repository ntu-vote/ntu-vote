import combineRouters from 'koa-combine-routers'

// unprotected
import indexRouter from './unprotected/index-router'
// protected

export const unprotectedRoutes = combineRouters(indexRouter)

export const protectedRoutes = combineRouters()
