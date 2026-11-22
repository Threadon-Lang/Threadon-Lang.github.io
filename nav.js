// Loads the shared navigation bar and marks the current page.
// Serve the docs over HTTP(S); browsers block fetch() for file:// pages.
(function () {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const libraryPages = new Set(["math.html", "lib-strings.html", "lists.html", "random.html", "bitops.html", "stats.html", "csv.html", "path.html", "hash.html", "vector.html", "containers.html", "intset.html", "format.html"]);

  fetch("nav.html")
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.text();
    })
    .then(function (markup) {
      mount.innerHTML = markup;
      const fromUrl = window.location.pathname.split("/").pop() || "index.html";
      let current = mount.dataset.current || fromUrl;
      if (current === "libraries") current = "libraries.html";
      else if (!current.endsWith(".html")) current += ".html";
      const active = libraryPages.has(current) ? "libraries.html" : current;
      mount.querySelectorAll("a[href]").forEach(function (link) {
        if (link.getAttribute("href") === active) {
          link.classList.add("here");
          link.setAttribute("aria-current", "page");
        }
      });
    })
    .catch(function (error) {
      mount.innerHTML = '<nav class="toc"><div class="wrap links">'
        + '<a href="index.html">Home</a></div></nav>';
      console.error("Could not load shared navigation:", error);
    });
})();
