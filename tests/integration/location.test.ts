import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import {createLocation} from "../factories/locationFactory";

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

describe("GET /locations", () => {
    async function signIn(){
        const user = await createUser();
        const {email} = user
        const session = await agent.post("/auth/sign-in").send({email,password:"123456"});
        const {token} = session.body
        return token;
    }
  it("should respond with status OK for valid token", async () => {
    const location = await createLocation();
    const token = await signIn();
    const response = await agent.get("/locations").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: location.name
        })
        ])
      );
  });

it("should respond with status UNAUTHORIZED for invalid token", async () => {
    const response = await agent.get("/locations").set('Authorization', "Bearer invalidToken");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
});

it("should respond with status UNAUTHORIZED for empty Authorization", async () => {
    const response = await agent.get("/locations");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
});
});