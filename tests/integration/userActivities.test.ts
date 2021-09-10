import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createLocation } from "../factories/locationFactory";
import { createActivity } from "../factories/activityFactory";
import { createUserActivity } from "../factories/userActivityFactory";
import { signIn } from "../factories/userFactory";

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

describe("POST /userActivities", () => {
  it("should respond with status OK when valid id, activityId and token are passed", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);

    const response = await agent
      .post("/userActivities")
      .send({ id: user.id, activity })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should respond with status UNAUTHORIZED when valid id, activityId but no token are passed", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    await signIn(user);

    const response = await agent
      .post("/userActivities")
      .send({ id: user.id, activity });
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status CONFLICT when trying to register two activities that occur at the same time", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);

    await agent
      .post("/userActivities")
      .send({ id: user.id, activity })
      .set("Authorization", `Bearer ${token}`);

    const response = await agent
      .post("/userActivities")
      .send({ id: user.id, activity })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  });
});

describe("POST /userActivities/delete", () => {
  it("should respond with status OK when valid id, activityId and token are passed", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);
    await createUserActivity(user.id, activity.id);

    const response = await agent
      .post("/userActivities/delete")
      .send({ id: user.id, activityId: activity.id })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should respond with status NOT_FOUND if userId is not found", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);
    await createUserActivity(user.id, activity.id);

    const response = await agent
      .post("/userActivities/delete")
      .send({ id: user.id + 1, activityId: activity.id})
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  it("should respond with status NOT_FOUND if activityId is not found", async () => {
    const location = await createLocation();
    const activity = await createActivity(location.id);
    const user = await createUser();
    const token = await signIn(user);
    await createUserActivity(user.id, activity.id);

    const response = await agent
      .post("/userActivities/delete")
      .send({ id: user.id, activityId: activity.id + 1})
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
  });
});

describe("GET /userActivities/:id", () => {
    it("should respond with status OK when valid id and token are passed", async () => {
      const location = await createLocation();
      const activity = await createActivity(location.id);
      const user = await createUser();
      const token = await signIn(user);
      await createUserActivity(user.id, activity.id);
  
      const response = await agent
        .get(`/userActivities/${user.id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toEqual(httpStatus.OK);
      expect(response.body).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
            id: expect.any(Number),
            userId: user.id,
            activityId: activity.id,
            activity: expect.objectContaining({
                id: activity.id,
                name: activity.name,
                description: activity.description,
                locationId: location.id,
                maxInscriptions: activity.maxInscriptions,
                inscriptions: activity.inscriptions + 1,
                beginTime: expect.any(String),
                endTime: expect.any(String)
            })
        }) 
       ])
      );
    });
  });
  
