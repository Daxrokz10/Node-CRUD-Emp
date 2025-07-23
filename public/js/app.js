function editEmployee(employee) {
  document.querySelector('input[name="ID"]').value = employee.id;
  document.querySelector('input[name="name"]').value = employee.name;
  document.querySelector('input[name="email"]').value = employee.email;
  document.querySelector('input[name="gender"]').value = employee.gender;
  document.querySelector('input[name="salary"]').value = employee.salary;
  document.querySelector('input[name="role"]').value = employee.role;

  document.querySelector('form').action = `/edit/${employee.id}`;
  document.querySelector('button[type="submit"]').textContent = 'Update';
}
function toggleForm() {
  document.getElementById('form-container').style.display = 'block';
  document.getElementById('table-container').style.display = 'none';
}
document.getElementById('searchBox').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  const rows = document.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const name = row.children[2].textContent.toLowerCase(); // 3rd column is name
    row.style.display = name.includes(keyword) ? '' : 'none';
  });
});
