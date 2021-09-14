import faker from "faker";
import bcrypt from "bcrypt"
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import jwt from "jsonwebtoken";
import * as redis from "redis";
const client = redis.createClient();

async function setToken(id: number, token: string) {
  client.set(`${id}`, `${token}`);
}

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 12)
  });
  await user.save();
  return user;
}

export async function signIn(user:User){
    const token = jwt.sign({
      userId: user.id
    }, process.env.JWT_SECRET);
  
    await setToken(user.id, token);
  
    return  token ;
  
  
}
