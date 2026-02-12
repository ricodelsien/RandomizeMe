document.addEventListener("DOMContentLoaded", function () {

  // Projekte aus LocalStorage laden
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // Projekte speichern
  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  // Projekt hinzufügen
  function addProject() {
    const input = document.getElementById("projectInput");
    const name = input.value.trim();

    if (name === "") return;

    projects.push(name);
    input.value = "";
    saveProjects();
    renderProjects();
    input.focus();
  }

  // Projekt löschen
  window.deleteProject = function(index) {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
  };

  window.deleteProject = function(index) {
  projects.splice(index, 1);
  saveProjects();
  renderProjects();
};

  // Projektliste anzeigen
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

  // Zufallsauswahl
  window.roll = function() {
    if (projects.length === 0) {
      alert("Noch keine Projekte vorhanden!");
      return;
    }

    const resultDiv = document.getElementById("result");
    const button = document.getElementById("randomBtn");

    button.classList.add("rolling");

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * projects.length);
      resultDiv.textContent = projects[randomIndex];
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      button.classList.remove("rolling");

      const finalIndex = Math.floor(Math.random() * projects.length);
      resultDiv.textContent = "Your UFO of the day is: " + projects[finalIndex];
    }, 2000);
  };

  // Datei-Import
  document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const lines = e.target.result.split(/\r?\n/);

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed !== "" && !projects.includes(trimmed)) {
          projects.push(trimmed);
        }
      });

      saveProjects();
      renderProjects();
    };

    reader.readAsText(file);
  });

  // Enter aktivieren
  document.getElementById("projectForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addProject();
  });

  // Initial rendern
  renderProjects();
});

