import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";
import { createRoom } from "../factories/roomFactory";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("POST /rooms", () => {
  it("should respond with status 200 when user choose a room", async () => {
    const hotel = await createHotel()
    const room = await createRoom(hotel.id)
    
    const user = await createUser();
    const {email} = user
    const session = await agent.post("/auth/sign-in").send({email,password:"123456"});
    const {token} = session.body

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: true
    };
    await agent.post("/payment").send(paymentBody);

    const choose = await agent.post("/rooms").send({currentUser:{userId:user.id},currentRoom:{id:room.id}}).set('Authorization', `Bearer ${token}`);

    expect(choose.statusCode).toEqual(httpStatus.OK);
  });

  it("should respond with status 200 when user change rooms", async () => {
    const hotel = await createHotel()
    const room1 = await createRoom(hotel.id)
    const room2 = await createRoom(hotel.id) 
    
    const user = await createUser();
    const {email} = user
    const session = await agent.post("/auth/sign-in").send({email,password:"123456"});
    const {token} = session.body

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: true
    };
    await agent.post("/payment").send(paymentBody);

    await agent.post("/rooms").send({currentUser:{userId:user.id},currentRoom:{id:room1.id}}).set('Authorization', `Bearer ${token}`);
    const change = await agent.post("/rooms").send({currentUser:{userId:user.id},currentRoom:{id:room2.id}}).set('Authorization', `Bearer ${token}`);

    expect(change.statusCode).toEqual(httpStatus.OK);
  });
});