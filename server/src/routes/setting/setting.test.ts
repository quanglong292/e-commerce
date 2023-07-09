const request = require("supertest");
const app = require("../../app");

describe("Test GET method for Setting", () => {
  test("It should return an object ob Setting", async () => {
    const reponse = await request(app).get("/setting");
    expect(reponse.statusCode).toBe(200);
  });
});
