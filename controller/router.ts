import combineRouters from 'koa-combine-routers'

// unprotected
import indexRouter from './unprotected/index-router'
import loginRouter from './unprotected/login-router'
import registerRouter from './unprotected/register-router'
// protected
import ballotRouter from './protected/ballot-router'
import campaignRouter from './protected/campaign'

export const unprotectedRoutes = combineRouters(
  indexRouter,
  loginRouter,
  registerRouter
)

export const protectedRoutes = combineRouters(campaignRouter, ballotRouter)
