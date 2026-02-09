let events = [];
const slider = document.getElementById("yearSlider");
const yearLabel = document.getElementById("yearLabel");
const results = document.getElementById("results");

fetch("events.json")
  .then(r => r.json())
  .then(data => {
    events = data;

    // Set slider range based on your data (so it stays correct if you add years)
    const years = events.map(e => e.year);
    const minY = Math.min(...years);
    const maxY = Math.max(...years);

    slider.min = minY;
    slider.max = maxY;
    slider.value = minY;

    update();
  });

slider.addEventListener("input", update);

function update() {
  const y = Number(slider.value);
  yearLabel.textContent = `Year: ${y}`;

  const list = events.filter(e => e.year === y);
  render(list);
}

function render(list) {
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = `<p>No events in this dataset for this year.</p>`;
    return;
  }

  list.forEach(ev => {
    results.innerHTML += `
      <div class="event">
        <strong>${ev.title}</strong>
        <div class="meta">${ev.year} · ${ev.category} · ${ev.location}</div>
        <p>${ev.summary}</p>
      </div>
    `;
  });
}
