import combineRouters from 'koa-combine-routers'

// unprotected
import indexRouter from './unprotected/index-router'
// protected
import ballotRouter from './protected/ballot-router'
import campaignRouter from './protected/campaign'

export const unprotectedRoutes = combineRouters(indexRouter)

export const protectedRoutes = combineRouters(campaignRouter, ballotRouter)
