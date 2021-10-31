import Koa from 'koa'
import Router from 'koa-router'
import RegistorProcessor from '../../processor/register/register'

const router = new Router()

router.prefix('/ntu-vote/api/register')

router.post('/', async  (ctx:Koa.ParameterizedContext, _) => {

        const username = ctx.request.body.username
        const passwordHash = ctx.request.body.password
        const display_name = ctx.request.body.display_name
        const real_name = ctx.request.body.real_name
        const student_id = ctx.request.body.student_id
        const public_key = ctx.request.body.public_key
        const private_key = ctx.request.body.private_key

        if (!username || !passwordHash || !display_name || !real_name || !student_id || !public_key || !private_key) {
            ctx.body = {
                status: 'Error',
                message: 'ERR_MISSING_INFO'
            }
            return;
        }

        ctx.body = await RegistorProcessor.post({
            params: {
                username: username,
                passwordHash: passwordHash,
                display_name: display_name,
                real_name: real_name,
                student_id: student_id,
                public_key: public_key,
                private_key: private_key
            }
        })
})

router.get('/check/username', async (ctx:Koa.ParameterizedContext, _) => {
    return await RegistorProcessor.checkUsername({
        params: {
            check_for: ctx.request.body.username
        }
    });
})

router.get('/check/student-id', async (ctx:Koa.ParameterizedContext, _) => {
    return await RegistorProcessor.checkUsername({
        params: {
            check_for: ctx.request.body.student_id
        }
    });
})