// Import as ES module
import { createSearchParams } from "use-search-params/vanilla";

// Initialize the search params handler
const params = createSearchParams();

// Example usage in vanilla JS
function initializeTagSelector() {
  const tags = ["typescript", "react", "nextjs", "nodejs"];
  const container = document.getElementById("tag-selector");

  // Render initial state
  function render() {
    const selectedTags = params.get("tags") || [];

    container.innerHTML = `
      <h2>Select Tags</h2>
      <div class="tags">
        ${tags
          .map(
            (tag) => `
          <button 
            class="tag ${params.matches("tags", tag) ? "active" : ""}"
            data-tag="${tag}"
          >
            ${tag}
          </button>
        `
          )
          .join("")}
      </div>
      <div class="selected">
        Selected: ${selectedTags.join(", ")}
      </div>
    `;
  }

  // Add event listeners
  container.addEventListener("click", (e) => {
    if (e.target.matches(".tag")) {
      const tag = e.target.dataset.tag;
      if (params.matches("tags", tag)) {
        params.remove("tags", tag);
      } else {
        params.add("tags", tag);
      }
      render();
    }
  });

  // Listen for URL changes
  window.addEventListener("urlchange", render);

  // Initial render
  render();
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeTagSelector);
