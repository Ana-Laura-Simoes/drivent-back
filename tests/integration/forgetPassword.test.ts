import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import {
  createInvalidUser,
  createUser,
  createUserWithToken,
} from "../factories/userFactory";
import { v4 as uuidv4 } from "uuid";

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

describe("POST /forgetpassword", () => {
  it("should respond with status CREATED and an object when a new recovery is created", async () => {
    const user = await createUser();
    const body = { email: user.email };

    const response = await agent.post("/forgetpassword").send(body);
    expect(response.statusCode).toEqual(httpStatus.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: user.email,
        token: expect.any(String),
        id: expect.any(Number),
        createdAt: expect.any(String),
      })
    );
  });

  it("should respond with status 400 when a non registered email is sended to recovery password", async () => {
    const body = { email: "invalid@email.com" };

    const response = await agent.post("/forgetpassword").send(body);
    expect(response.statusCode).toEqual(httpStatus.BAD_REQUEST);
  });
});

describe("GET /forgetpassword/:token", () => {
  it("should respond with status 500 when a token is invalid", async () => {
    const token = "invalid";
    const response = await agent.get(`/forgetpassword/${token}`);
    expect(response.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
  });

  it("should respond with status OK when the info of recovery is successful", async () => {
    const user = await createUserWithToken();
    const token = user.token;

    const response = await agent.get(`/forgetpassword/${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
});

describe("POST /setnewpassword", () => {
  it("should respond with status OK when the password is changed with success", async () => {
    const user = await createUser();

    const body = {
      email: user.email,
      password: "teste",
      confirmPassword: "teste",
    };

    const response = await agent
      .post(`/forgetpassword/setnewpassword`)
      .send(body);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should respond with status 500 when there is no body sended", async () => {
    const response = await agent
      .post(`/forgetpassword/setnewpassword`)
      .send({});
    expect(response.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
  });
});
