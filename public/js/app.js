const { name } = require("ejs");

function showForm() {
  document.getElementById("form-container").classList.remove("d-none");
  document.getElementById("table-container").classList.add("d-none");
}

function hideForm() {
  document.getElementById("form-container").classList.add("d-none");
  document.getElementById("table-container").classList.remove("d-none");
}



// // // Show table after submitting the form
window.addEventListener("load", () => {
  const formSubmitted = window.location.href.includes("submitted=true");
  if (formSubmitted) {
    hideForm();
  }
});

// // Search
document.getElementById("searchBox").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    const name = row.children[2].textContent.toLowerCase();
    row.style.display = name.includes(keyword) ? "" : "none";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const formSubmitted = window.location.href.includes("submitted=true");
  if (formSubmitted) {
    hideForm();
  }
});