import Koa from 'koa'
import cors from '@koa/cors'
import json from 'koa-json'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { CronJob } from 'cron' 

import {
  staticMiddleware,
  sessionMiddleware,
  parserMiddleware,
  loggerMiddleware,
} from './middleware/utility'

import { authMiddleware } from './middleware/authorization'
import { unprotectedRoutes, protectedRoutes } from './controller/router'
import config from './config'

import { Campaign } from './orm/entity/procedure/Campaigns'
import { getRepository } from 'typeorm'

const app = new Koa()

app.keys = config.sessionKeys

// initialize db
const connectionPromise = createConnection()
Promise.all([connectionPromise]).then(() => {
  //cron jobs here
  
  // Update result of campaigns every 10 minutes
  new CronJob({cronTime: '*/10 * * * *', onTick: async function () {
      const campaignList = await getRepository(Campaign).find({ 
        relations: [
          'rule',
          'candidates',
          'candidates.ballots',
        ] 
      })
      const now = new Date()
      console.log(now)
      campaignList.forEach(async (campaign) => {
        // already have a result
        if (campaign.result != null || campaign.result != '') {
          return;
        }
        
        // count votes only when the event ends
        const now = new Date()
        const endTime = new Date(campaign.endTime)
        if (now < endTime) {
          return;
        }

        // announce winner
        const winner = { cid: -1, votes: -1, name: ''}
        if (campaign.rule.rule == '多數決' || campaign.rule.rule == 'majority') {
          campaign.candidates.forEach((candidate) => {
              if (candidate.ballots.length > winner.votes) {
                winner.cid = candidate.cid
                winner.votes = candidate.ballots.length
                winner.name = candidate.name
              }
          })
        } else {
          campaign.candidates.forEach((candidate) => {
            if (candidate.ballots.length > winner.votes) {
              winner.cid = candidate.cid
              winner.votes = candidate.ballots.length
              winner.name = candidate.name
            }
          })
        }

        // update campaign result
        console.log(campaign.title, winner.cid, winner.votes)
        campaign.result = winner.name
        await getRepository(Campaign).save(campaign);
      })
  }, onComplete: null, start: true });
})

// middlewares
app.use(cors());
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
