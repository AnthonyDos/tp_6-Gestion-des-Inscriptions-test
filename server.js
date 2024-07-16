const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());

const enrolledCourses = [];

function isValidDay(day) {
  return parseInt(day) >= 1 && parseInt(day) <= 5;
}

function isValidTime(time) {
  return time === "morning" || time === "afternoon";
}

app.get("/formulaire.html", (req, res) => {
  res.sendFile(path.join(__dirname, "src/views", "formulaire.html"));
});

app.post("/submit", (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ error: "Nom, email et téléphone sont requis" });
  }
  enrolledCourses.push({ name, email, phone });
  res.status(200).json({ message: "Formulaire reçu!" });
});

app.post("/enroll", (req, res) => {
  const { courses } = req.body;
  if (!courses) {
    return res.status(400).json({ error: "Le champ 'courses' est requis." });
  }

  for (const courseName in courses) {
    const { day, time } = courses[courseName];
    if (!isValidDay(day) || !isValidTime(time)) {
      return res
        .status(400)
        .json({ error: "Le format du jour ou de l'heure est invalide." });
    }
    const isConflict = enrolledCourses.some((course) => {
      return (
        course.name !== courseName && course.day === day && course.time === time
      );
    });
    if (isConflict) {
      return res
        .status(400)
        .json({ error: "Un cours est déjà inscrit à ce jour." });
    }
  }

  for (const courseName in courses) {
    const { day, time } = courses[courseName];
    enrolledCourses.push({ name: courseName, day, time });
  }

  res.status(200).json({ message: "Inscription aux cours réussie!" });
});

app.get("/courses", (req, res) => {
  res.status(200).json({ courses: enrolledCourses });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });
}

module.exports = { app };
