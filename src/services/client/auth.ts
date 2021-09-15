import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";

import * as redis from "redis";
const client = redis.createClient();

export async function setToken(id: number, token: string) {
  client.set(`${id}`, `${token}`, (err, data) => {
    if (err) console.error(err);
    return data;
  });
}

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );

  await setToken(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email,
    },

    token,
  };
}
