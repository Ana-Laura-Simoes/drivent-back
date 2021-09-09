import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import {createLocation} from "../factories/locationFactory";
import {createActivity} from "../factories/activityFactory";
import {signIn} from "../factories/userFactory";

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

describe("GET /activities/days", () => {
    it("should respond with status OK and object with array of activities for that day for valid token", async () => {
      const location = await createLocation();
      const activity = await createActivity(location.id);
      const user = await createUser();
      const token = await signIn(user);

      const response = await agent.get("/activities/days").set('Authorization', `Bearer ${token}`);
      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
            beginTime: expect.any(String)
        }) 
       ])
      );
    });
  
  it("should respond with status UNAUTHORIZED for invalid token", async () => {
      const response = await agent.get("/activities/days").set('Authorization', "Bearer invalidToken");
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
  
  it("should respond with status UNAUTHORIZED for empty Authorization", async () => {
      const response = await agent.get("/activities/days");
      expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
  });


describe("GET /activities/:day", () => {
  it("should respond with status OK and object with array of activities for that day for valid token", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);

    const response = await agent.get("/activities/2021-10-22").set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual(
      expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: activity.name,
        description: activity.description,
        locationId: location.id,
        maxInscriptions: activity.maxInscriptions,
        inscriptions: activity.inscriptions,
        beginTime:expect.any(String),
        endTime:expect.any(String),
      })
    ])
    );
  });

it("should respond with status UNAUTHORIZED for invalid token", async () => {
    const response = await agent.get("/activities/2021-10-22").set('Authorization', "Bearer invalidToken");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
});

it("should respond with status UNAUTHORIZED for empty Authorization", async () => {
    const response = await agent.get("/activities/2021-10-22");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
});
});