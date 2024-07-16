async function fetchCourses() {
  const response = await fetch("/courses");
  const data = await response.json();
  displayCourses(data.courses);
}
function displayCourses(courses) {
  const container = document.getElementById("coursesContainer");

  if (courses.length === 0) {
    container.innerHTML = "<p>Aucun cours inscrit.</p>";
    return;
  }
  courses.forEach((course) => {
    const courseList = document.createElement("div");
    courseList.innerHTML = `
 <h3>Cours Inscrits:</h3>
 <ul>
    ${Object.entries(course)
      .map(
        ([subject, details]) =>
          `<li>${subject}: Jour ${details.day},Heure: ${details.time}</li>`
      )
      .join("")}
 </ul>`;
    container.appendChild(courseList);
  });
}
