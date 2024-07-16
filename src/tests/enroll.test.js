const { app } = require("../../server");
const request = require("supertest");

describe("POST /enroll", () => {
  it("should enroll courses successfully", async () => {
    const response = await request(app)
      .post("/enroll")
      .send({
        courses: {
          maths: { day: "1", time: "morning" },
          physics: { day: "2", time: "afternoon" },
        },
      });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Inscription aux cours réussie!");
  });

  it("should return error for overlapping courses", async () => {
    // Envoyer une première requête pour inscrire un cours
    const initialResponse = await request(app)
      .post("/enroll")
      .send({
        courses: {
          course1: { day: 1, time: "morning" },
        },
      });
    expect(initialResponse.status).toBe(200);

    // Tenter d'inscrire un cours qui chevauche avec le premier
    const conflictResponse = await request(app)
      .post("/enroll")
      .send({
        courses: {
          course2: { day: 1, time: "morning" },
        },
      });
    expect(conflictResponse.status).toBe(400);
    expect(conflictResponse.body.error).toBe(
      "Un cours est déjà inscrit à ce jour."
    );
  });

  it("should enroll courses successfully with different sets of courses", async () => {
    const response1 = await request(app)
      .post("/enroll")
      .send({
        courses: {
          course1: { day: 1, time: "morning" },
          course2: { day: 2, time: "afternoon" },
        },
      });
    expect(response1.status).toBe(200);
    expect(response1.body.message).toBe("Inscription aux cours réussie!");
  });

  it("should return 400 if courses object is missing", async () => {
    const response = await request(app).post("/enroll").send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Le champ 'courses' est requis.");
  });

  it("should return 400 if day or time format is invalid", async () => {
    const response = await request(app)
      .post("/enroll")
      .send({
        courses: {
          maths: { day: "8", time: "morning" },
        },
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(
      "Le format du jour ou de l'heure est invalide."
    );
  });

  it("should handle more complex overlapping courses", async () => {
    const initialResponse = await request(app)
      .post("/enroll")
      .send({
        courses: {
          course1: { day: 1, time: "morning" },
        },
      });
    expect(initialResponse.status).toBe(200);

    const conflictResponse = await request(app)
      .post("/enroll")
      .send({
        courses: {
          course2: { day: 1, time: "morning" },
        },
      });
    expect(conflictResponse.status).toBe(400);
    expect(conflictResponse.body.error).toBe(
      "Un cours est déjà inscrit à ce jour."
    );
  });
});
