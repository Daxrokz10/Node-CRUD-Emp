const express = require('express');
const path = require('path');
const app = express();

const employees = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// GET homepage - show form and table
app.get('/', (req, res) => {
  res.render('index', { employees });
});

// POST new employee
app.post('/', (req, res) => {
  const newEmployee = {
    id: Date.now().toString(), // generate unique ID
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    salary: req.body.salary,
    role: req.body.role
  };
  employees.push(newEmployee);
  console.log(employees);
  res.redirect('/');
});





// DELETE route
app.get('/user/delete/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
  }
  res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
