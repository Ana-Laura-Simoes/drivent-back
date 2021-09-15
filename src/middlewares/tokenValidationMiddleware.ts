import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import * as sessionService from "@/services/client/session";
import UnauthorizedError from "@/errors/Unauthorized";

import * as redis from "redis";
import { writeFileSync } from "fs";
const client =
  process.env.NODE_ENV === "development"
    ? redis.createClient()
    : redis.createClient(process.env.REDIS_URL, {
      tls: {
        rejectUnauthorized: false,
      },
    });

interface JwtPayload {
  userId: number;
}

export async function getToken(id: number, token: string) {
  client.get(`${id}`, function(err, value) {
    if (err) console.error(err);
    if (token !== value) throw new UnauthorizedError();
  });
}

export default async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError();
    }

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    await getToken(userId, token);

    req.user = { id: userId };
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
}
