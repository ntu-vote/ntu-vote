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
        return;
      }
  } catch (err: any) {
      if (err.message == 'jwt expired') {
        ctx.body = {
          status: 'Error',
          message: 'ERR_JWT_EXPIRED'
        };
        return;
      }
      ctx.body = {
        status: 'Error',
        message: 'ERR_INVALID_JWT'
      };
      return;
  }

  await next();
};

// generate email verify token
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1800s",
  });
};