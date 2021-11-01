import Koa from 'koa'
import Router from 'koa-router'
import IndexProcessor from '../../processor/index/index'
import * as IIndexProcessor from '../../processor/index/index.type'

const router = new Router()

router.prefix('/ntu-vote/api/ballot')

router.get(
  '/',
  async (ctx:Koa.ParameterizedContext, _) => {
    await IndexProcessor.get({ query: ctx.query } as IIndexProcessor.getIn)
  }
)

export default router
