const { app } = require("../../server");
const request = require("supertest");

describe("GET /courses", () => {
  it("should return list of courses", async () => {
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(response.body.courses).toBeDefined();
  });

  it("should return an empty array if no courses are enrolled", async () => {
    enrolledCourses = [];
    const response = await request(app).get("/courses");
    expect(response.status).toBe(200);
    expect(response.body.courses).toEqual([]);
  });
});
