import faker from "faker";
import bcrypt from "bcrypt"
import User from "../../src/entities/User";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 12)
  });

  await user.save();
  
  return user;
}
