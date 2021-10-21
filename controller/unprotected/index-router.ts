import Koa from 'koa'
import Router from 'koa-router'
import IndexProcessor from '../../processor/index/index'
import * as IIndexProcessor from '../../processor/index/index.type'

const router = new Router()

router.prefix('/')

router.get(
  '/',
  async (_: Koa.ParameterizedContext, next) => {
    await next()
  },
  async (ctx, _) => {
    await IndexProcessor.get({ query: ctx.query } as IIndexProcessor.getIn)
  }
)

export default router
