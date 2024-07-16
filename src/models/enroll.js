document
  .getElementById("courseForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const courses = {
      maths: {
        day: document.getElementById("mathsDay").value,
        time: document.getElementById("mathsTime").value,
      },
      francais: {
        day: document.getElementById("francaisDay").value,
        time: document.getElementById("francaisTime").value,
      },
    };
    const schedule = {};
    let isValid = true;
    for (const [subject, { day, time }] of Object.entries(courses)) {
      const key = `${day}-${time}`;
      if (schedule[key]) {
        isValid = false;
        alert(
          `Erreur: ${
            subject.charAt(0).toUpperCase() + subject.slice(1)
          } ne peut pas être pris le même jour et à la même heure qu'un autre cours.`
        );
        break;
      }
      schedule[key] = subject;
    }
    if (!isValid) return;
    const response = await fetch("/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courses }),
    });
    if (response.ok) {
      window.location.href = "/courses.html";
    } else {
      alert("Erreur lors de l'inscription aux cours");
    }
  });
