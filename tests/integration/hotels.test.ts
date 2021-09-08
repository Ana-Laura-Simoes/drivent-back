import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createHotel } from "../factories/hotelFactory"
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

describe("GET /hotels", () => {
  it("should respond with status 200", async () => {
    const hotel = await createHotel()
    const room = await createRoom(hotel.id)
    const hotels = await agent.get("/hotels");

    expect(hotels.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: hotel.id,
          name: hotel.name,
          image: hotel.image,
          rooms:expect.arrayContaining([
            expect.objectContaining({
              id: room.id,
              type:room.type,
            })
          ])
        })
      ])
    );

    expect(hotels.statusCode).toEqual(httpStatus.OK);
  });
});