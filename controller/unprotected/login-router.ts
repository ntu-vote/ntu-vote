import Koa from 'koa'
import Router from 'koa-router'
import LoginProcessor from '../../processor/login/login'

const router = new Router()

router.prefix('/api/login')

router.post('/', async  (ctx:Koa.ParameterizedContext, _) => {
        const authHeader = ctx.headers.authorization

        if (authHeader === undefined) {
            ctx.body = {
                status: 'Error',
                message: 'ERR_MISSING_HEADER'
            }
            return;
        }
      
        const username = authHeader.split(" ")[1].split(":")[0]
        const claimedPassword = authHeader.split(" ")[1].split(":")[1]

        if (username === undefined || claimedPassword === undefined) {
            ctx.body = {
                status: 'Error',
                message: 'ERR_MISSING_INFO'
            }
            return;
        }

        ctx.body = await LoginProcessor.post({
            params: {
                username: username,
                claimedPassword: claimedPassword
            }
        })
})