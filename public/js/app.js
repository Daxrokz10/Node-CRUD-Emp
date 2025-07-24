function showForm() {
  document.getElementById("form-container").style.display = "block";
  document.getElementById("table-container").style.display = "none";
}

function hideForm() {
  document.getElementById("form-container").style.display = "none";
  document.getElementById("table-container").style.display = "block";
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
