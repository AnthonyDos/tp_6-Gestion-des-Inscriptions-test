const { app } = require("../../server");
const request = require("supertest");

describe("Form Submission", () => {
  it("should return 200 for valid form submission", async () => {
    const response = await request(app).post("/submit").send({
      name: "test exo",
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
    expect(response.body.error).toBe("Nom, email et téléphone sont requis"); // Ajusté pour refléter le message actuel
  });

  it("should display enrolled courses after form submission", async () => {
    await request(app).post("/submit").send({
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const coursesResponse = await request(app).get("/courses");
    expect(coursesResponse.status).toBe(200);
    expect(coursesResponse.body.courses.length).toBeGreaterThan(0);
  });
});
