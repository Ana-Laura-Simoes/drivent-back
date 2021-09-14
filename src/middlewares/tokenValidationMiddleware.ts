import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import * as sessionService from "@/services/client/session";
import UnauthorizedError from "@/errors/Unauthorized";

import * as redis from "redis";
const client = redis.createClient();

interface JwtPayload {
    userId: number
}

export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError();
    } 
  
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    //const userSession = await client.get(`${token}`, redis.print);

    if(token !== token) {
      throw new UnauthorizedError();
    }

    req.user = { id: userId };
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
}
