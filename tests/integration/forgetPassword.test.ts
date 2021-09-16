import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
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
    it("should respond with status OK and an object when get the recovery info with success", async () => {
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
});