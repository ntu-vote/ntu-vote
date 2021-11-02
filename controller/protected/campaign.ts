import Koa from 'koa'
import Router from 'koa-router'
import CampaignProcessor from '../../processor/campaign/campaign'
import * as ICampaignProcessor from '../../processor/campaign/campaign.type'

const router = new Router()

router.prefix('/api/campaign')

router.get('/', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await CampaignProcessor.get()
})

router.get('/:cpnId', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await CampaignProcessor.getIdv({
    params: ctx.params,
  } as ICampaignProcessor.getIdvIn)
})

export default router
