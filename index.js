const express = require('express');
const path = require('path');
const app = express();

const employees = [];
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index',{employees});
});
app.post('/', (req, res) => {
  const newEmployee = { id: Date.now().toString(), ...req.body }; // auto-generate id
  employees.push(newEmployee);
  res.redirect('/');
});
app.get('/table', (req, res) => {
    res.render('table', { employees });
});
app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id == id);
  if (index !== -1) {
    employees[index] = req.body;
    employees[index].id = id; // preserve ID
  }
  res.redirect('/');
});
app.get('/user/delete/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id == id);
  if (index !== -1) {
    employees.splice(index, 1);
  }
  res.redirect('/');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
