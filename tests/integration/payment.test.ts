import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { send } from "process";

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

describe("POST /users", () => {
  it("should create a new payment", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: true
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.CREATED);
  });

  it("should not create a new payment because of empty body", async () => {
    await createUser();

    const payment = await agent.post("/payment").send({});

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return error when userName has less than 4 characters", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Cre",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: true
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return error when userId is invalid", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Credit Card Name",
      userId: "invaliduser.id + 1",
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: true
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return error when price is invalid", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: "invalid",
      type: "Online",
      hotel: true
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return error when type is invalid", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "invalid",
      hotel: true
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return error when hotel is not a boolean", async () => {
    const user = await createUser();

    const paymentBody = {
      userName: "Credit Card Name",
      userId: user.id,
      userEmail: user.email,
      price: 300,
      type: "Online",
      hotel: "notBoolean"
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});

describe("GET /users", () => {
  it("should return status 401", async () => {
    const payment = await agent.get("/payment");

    expect(payment.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return status 200", async () => {
    const user = await createUser();
    const {email} = user

    const session = await agent.post("/auth/sign-in").send({email,password:"123456"});
    const {token} = session.body
    const payment = await agent.get("/payment").set('Authorization', `Bearer ${token}`);

    expect(payment.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return status 200", async () => {
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

    const pago = await agent.post("/payment").send(paymentBody);

    const payment = await agent.get("/payment").set('Authorization', `Bearer ${token}`);

    expect(payment.statusCode).toEqual(httpStatus.OK);
  });
});
