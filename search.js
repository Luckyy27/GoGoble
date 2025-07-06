document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  const suggestions = document.getElementById("suggestions");

  let destinations = [];

  // Load data from destinations.json
  fetch("destinations.json")
    .then(res => res.json())
    .then(data => destinations = data);

  // Search logic
  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase().trim();
    suggestions.innerHTML = "";

    if (query.length === 0) {
      suggestions.classList.add("hidden");
      return;
    }

    const matches = destinations.filter(dest =>
      dest.title.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      suggestions.classList.add("hidden");
      return;
    }

    matches.forEach(dest => {
      const div = document.createElement("div");
      div.className = "p-2 hover:bg-orange-100 cursor-pointer flex items-center gap-3";
      div.innerHTML = `
        <img src="${dest.image}" class="w-12 h-12 object-cover rounded" />
        <span class="text-sm">${dest.title}</span>
      `;
      div.addEventListener("click", () => {
        window.location.href = `template.html?id=${dest.id}`;
      });
      suggestions.appendChild(div);
    });

    suggestions.classList.remove("hidden");
  });

  // Hide suggestions if clicked outside
  document.addEventListener("click", (e) => {
    if (!searchBox.contains(e.target) && !suggestions.contains(e.target)) {
      suggestions.classList.add("hidden");
    }
  });
});
