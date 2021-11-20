import Koa from 'koa'
import Router from 'koa-router'
import BallotProcessor from '../../processor/ballot/ballot'
import * as IBallotProcessor from '../../processor/ballot/ballot.type'

const router = new Router()

router.prefix('/api/ballot')

router.get('/key', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await BallotProcessor.getKey({
    headers: ctx.headers,
  } as IBallotProcessor.getKeyIn)
})

router.post('/cast', async (ctx: Koa.ParameterizedContext, _) => {
  ctx.body = await BallotProcessor.postCast({
    headers: ctx.headers,
    body: ctx.request.body,
  } as IBallotProcessor.postCastIn)
})

export default router
