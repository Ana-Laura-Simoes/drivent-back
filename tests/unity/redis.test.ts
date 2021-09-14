import * as redis from "redis";
const client = redis.createClient();
import * as redisSet from "../../src/services/client/auth";
import * as redisGet from "../../src/middlewares/tokenValidationMiddleware";

describe("setToken", () => {
  it("Should add a key into the database", () => {
    client.set("test", "token", (err, data) => {
      if (err) console.error(err);
      expect(data).toBe("OK");
    });
  });

  it("Should return a key from database", async () => {
    client.set("test", "token");

    client.get("test", (err, data) => {
      if (err) console.error(err);
      expect(data).toBe("token");
    });
  });
});
