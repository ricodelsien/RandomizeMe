document.addEventListener("DOMContentLoaded", function () {

  // import projects from txt or csv
  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  // save project
  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  // add project
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

  // delete project
  window.deleteProject = function(index) {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
  };

  // delete entire list
window.clearAll = function() {
  const confirmDelete = confirm("Do you really want to clear the list?");
  if (!confirmDelete) return;

  projects = [];
  localStorage.removeItem("projects");
  renderProjects();
  document.getElementById("result").textContent = "";
};

  // show list
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

  // randomiser
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

  // import data
  document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
const content = e.target.result;

// seperate by comma or breaks
const entries = content.split(/[\r\n,]+/);

entries.forEach(entry => {
  const trimmed = entry.trim();
  if (trimmed !== "" && !projects.includes(trimmed)) {
    projects.push(trimmed);
  }
});


      saveProjects();
      renderProjects();
    };

    reader.readAsText(file);
  });

  // activate add on enter
  document.getElementById("projectForm").addEventListener("submit", function(event) {
    event.preventDefault();
    addProject();
  });

  // render init
  renderProjects();
});






