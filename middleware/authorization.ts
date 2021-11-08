import { Next } from 'koa'
import Koa from 'koa'
import * as jwt from 'jsonwebtoken'
import { createContext } from 'vm'

export const authMiddleware = async (ctx: Koa.ParameterizedContext, next: Next) => {
  const authHeader = ctx.headers.authorization;

  if (authHeader === undefined) {
    ctx.body = {
      status: 'Error',
      message: 'ERR_MISSING_HEADER'
    }
    return;
  }

  const username = authHeader && authHeader.split(" ")[1].split(":")[0];
  const token = authHeader && authHeader.split(" ")[1].split(":")[1];

  if (username === undefined) {
    ctx.body = {
      status: 'Error',
      message: 'ERR_MISSING_USERNAME'
    }
    return;
  }

  if (token === undefined) {
      ctx.body = {
        status: 'Error',
        message: 'ERR_MISSING_JWT'
      }
      return;
  }

  try {
      const decoded = jwt.verify(token, process.env.SECRET);
      if (decoded.username !== username) {
        ctx.body = {
          status: 'Error',
          message: 'ERR_MISMATCHED_JWT'
        }
      }
  } catch (err: any) {
      if (err.message == 'jwt expired') {
          return ctx.redirect('/')
      }
      ctx.body = {
        status: 'Error',
        message: 'ERR_SOMETHING_WRONG'
      };
  }

  await next();
};

// generate email verify token
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, '_:d//`2a?E2B^s~p&`XMhGT[7~4w)atTMY]:F3HPn{6c2+XFDC6-:R8%Z)w@GH/f"E-^ds>zb*<x4yev3Lq%c+.qZ?8.H`JjLRtYXf-~,Vqc46-yk+"VXE)w<WT:48$FNG/p4^YQ%vgWKUN7Y$2G9hC;):r5`M=Y?`Db$hZz8-Fd[jqNncFm4yNz8Wa#+E#b;k/]<\'e3}SSu8BwCnB$D!&ZNX~_rGF\'}FKDvR/R+/3D\\SdzA[6\\VTMUJ9H]X3T@/', {
      expiresIn: "1800s",
  });
};