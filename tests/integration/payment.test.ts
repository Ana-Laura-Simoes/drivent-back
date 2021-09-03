import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";

import app, { init } from "@/app";
import Payment from "@/entities/Payment";
import User from "@/entities/User";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";

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
    };

    const payment = await agent.post("/payment").send(paymentBody);

    expect(payment.statusCode).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
