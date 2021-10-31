import Koa from 'koa'
import Router from 'koa-router'
import CandidateProcessor from '../../processor/campaign/campaign'
import * as ICandidateProcessor from '../../processor/campaign/campaign.type'

const router = new Router()

router.prefix('/api/campaign')

router.get('/', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await CandidateProcessor.get()
})

router.get('/:cpnId', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await CandidateProcessor.getIdv({
    params: ctx.params,
  } as ICandidateProcessor.getIdvIn)
})

export default router
