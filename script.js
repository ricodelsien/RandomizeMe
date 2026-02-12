let projects = JSON.parse(localStorage.getItem("projects")) || [];

renderProjects();

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function addProject() {
  const input = document.getElementById("projectInput");
  const name = input.value.trim();

  if (name === "") return;

  projects.push(name);
  input.value = "";
  saveProjects();
  renderProjects();
}

function deleteProject(index) {
  projects.splice(index, 1);
  saveProjects();
  renderProjects();
}

function renderProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${project}
      <button onclick="deleteProject(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function roll() {
  if (projects.length === 0) {
    alert("Noch keine Projekte vorhanden!");
    return;
  }

  const resultDiv = document.getElementById("result");
  const button = document.getElementById("randomBtn");

  button.classList.add("rolling");

  let counter = 0;
  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * projects.length);
    resultDiv.textContent = projects[randomIndex];
    counter++;
  }, 80);

  setTimeout(() => {
    clearInterval(interval);
    button.classList.remove("rolling");

    const finalIndex = Math.floor(Math.random() * projects.length);
    resultDiv.textContent = "Gewählt: " + projects[finalIndex];
  }, 2000);
}

document.getElementById("fileInput").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split(/\r?\n/);
    lines.forEach(line => {
      if (line.trim() !== "") {
        projects.push(line.trim());
      }
    });
    saveProjects();
    renderProjects();
  };
  reader.readAsText(file);
});

