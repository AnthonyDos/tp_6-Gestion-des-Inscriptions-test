const request = require("supertest");
const { app } = require("../../server");

describe("POST /submit", () => {
  it("should return 200 for valid input", async () => {
    const response = await request(app).post("/submit").send({
      name: "test",
      email: "test@example.com",
      phone: "1234567890",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Formulaire reçu!");
  });

  it("should return 400 for missing phone number", async () => {
    const response = await request(app).post("/submit").send({
      name: "John Doe",
      email: "john@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Nom, email et téléphone sont requis");
  });
});
