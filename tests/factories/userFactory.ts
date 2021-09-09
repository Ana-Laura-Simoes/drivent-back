import faker from "faker";
import bcrypt from "bcrypt"
import User from "../../src/entities/User";
import Session from "../../src/entities/Session";
import jwt from "jsonwebtoken";

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
  
    await Session.createNew(user.id, token);
  
    return  token ;
  
  
}
