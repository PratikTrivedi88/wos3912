let data = JSON.parse(localStorage.getItem("eventData")) || null;

if (!data) {
  fetch("data.json")
    .then(res => res.json())
    .then(json => {
      data = json;
      localStorage.setItem("eventData", JSON.stringify(data));
      renderUI();
    });
} else {
  renderUI();
}

// Clocks
setInterval(() => {
  document.getElementById("localClock").textContent =
    "Local: " + new Date().toLocaleTimeString();
  document.getElementById("utcClock").textContent =
    "UTC: " + new Date().toUTCString();
}, 1000);

// Render countdowns
function renderUI() {
  const countdowns = document.getElementById("countdowns");
  if (!countdowns) return;
  countdowns.innerHTML = "";
  data.events.forEach(event => {
    const div = document.createElement("div");
    div.textContent = `${event.name} (${event.alliance}) → ${countdown(event.start)}`;
    countdowns.appendChild(div);
  });
}

function countdown(start) {
  const diff = new Date(start) - new Date();
  if (diff <= 0) return "Started!";
  const hrs = Math.floor(diff / 1000 / 3600);
  const mins = Math.floor((diff / 1000 % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

// Admin panel
function addEvent() {
  data.events.push({
    name: "New Event",
    type: "PvE",
    alliance: data.alliances[0],
    start: new Date().toISOString(),
    end: new Date().toISOString()
  });
  saveData();
  renderUI();
}

function saveData() {
  localStorage.setItem("eventData", JSON.stringify(data));
  alert("Data saved!");
}
