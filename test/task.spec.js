/**
 *  API integration test for Tasks
 */

const request = require("supertest");
const app = require("../server");

/***
 *  Create Mock Task entries
 */
describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({
        userId: 1,
        title: "test is cool",
      })
      .expect(res.statusCode)
      .toEqual(201);
    expect(res.body).toHaveProperty("post");
  });
});

/****
 *  Update existing Task
 */

/***
 * Delete a Mock Task
 */
