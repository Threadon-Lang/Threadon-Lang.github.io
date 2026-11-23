// Loads the shared navigation bar and marks the current page.
(function () {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const libraryPages = new Set(["math.html", "lib-strings.html", "lists.html", "random.html", "bitops.html", "stats.html", "csv.html", "path.html", "hash.html", "vector.html", "containers.html", "intset.html", "format.html", "base64.html", "url.html", "checksum.html", "complex.html", "fraction.html", "heap.html", "strset.html", "date.html", "units.html", "color.html", "table.html", "validate.html", "graph.html"]);

  function render(markup) {
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
  }

  render("<nav class=\"toc\">\n  <div class=\"wrap links\">\n    <a href=\"index.html\">Home</a>\n    <a href=\"basics.html\">Basics</a>\n    <a href=\"strings.html\">Strings</a>\n    <a href=\"types.html\">Types</a>\n    <a href=\"variables.html\">Variables</a>\n    <a href=\"operators.html\">Operators</a>\n    <a href=\"casts.html\">Casts</a>\n    <a href=\"flow.html\">Flow</a>\n    <a href=\"functions.html\">Functions</a>\n    <a href=\"structs.html\">Structs</a>\n    <a href=\"unions.html\">Unions</a>\n    <a href=\"references.html\">References</a>\n    <a href=\"classes.html\">Classes</a>\n    <a href=\"builtins.html\">Builtins</a>\n    <a href=\"stdlib.html\">Std lib</a>\n    <a href=\"libraries.html\">Libraries</a>\n    <a href=\"cli.html\">CLI</a>\n    <a href=\"debug.html\">Debug</a>\n    <a href=\"exceptions.html\">Exceptions</a>\n    <a href=\"gc.html\">GC</a>\n    <a href=\"examples.html\">Examples</a>\n    <a href=\"limits.html\">Limits</a>\n    <a href=\"threads.html\">Threads</a>\n  </div>\n</nav>\n");

  if (typeof fetch === "function") {
    fetch("nav.html")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.text();
      })
      .then(render)
      .catch(function (error) {
        console.warn("Keeping embedded navigation; could not load nav.html:", error);
      });
  }
})();
