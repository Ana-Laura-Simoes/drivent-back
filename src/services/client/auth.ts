import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";
import Session from "@/entities/Session";

import * as redis from "redis";
const client = redis.createClient();

export async function signIn(email: string, password: string) {
  let testezinho;

  async function setToken(id: number, token: string) {
    client.set(`${id}`, `${token}`);
  }

  async function getToken(id: number) {
    return client.get(`${id}`, function(err, value) {
      testezinho = value;
    });
  }
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

  //await Session.createNew(user.id, token);
  await setToken(user.id, token);
  const teste = await getToken(user.id);
  console.log("O testezinho é: ", testezinho);

  return {
    user: {
      id: user.id,
      email: user.email,
    },

    token,
  };
}
