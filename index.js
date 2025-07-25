const { log } = require('console');
const express = require('express');
const path = require('path');
const app = express();

let employees = [];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// GET homepage - show form and table
app.get('/', (req, res) => {
  res.render('index', { employees });
});

// POST new employee
app.post('/add', (req, res) => {
  const newEmployee = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    salary: req.body.salary,
    role: req.body.role,
    task: {
      priority: "N/A",
      description: "No task assigned"
    }
  };
  employees.push(newEmployee);
  res.redirect('/?submitted=true');
});



// EDIT GET route
app.get('/user/edit/:id', (req, res) => {
  const { id } = req.params;
  const data = employees.find(emp => emp.id === id);
  res.render('edit.ejs', { data })
})

//EDIT POST route
app.post('/user/edit/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  employees = employees.map(emp => {
    if (emp.id === id) {
      return { ...req.body, id }
    }
    return emp;
  })
  res.redirect('/');
})

// TASK GET route
app.get('/user/task/:id', (req, res) => {
  const { id } = req.params;
  const data = employees.find(emp => emp.id === id);
  res.render('task.ejs', { data });
})
//TASK POST route
app.post('/user/task/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.map(emp => {
    if (emp.id === id) {
      return {
        ...emp,
        task: {
          description: req.body.description,
          priority: req.body.priority
        }
      }
    }
    else{
        return emp;
    }
  })
    res.redirect('/');

})

// DELETE route
app.get('/user/delete/:id', (req, res) => {
  const id = req.params.id;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
  }
  res.redirect('/');
});

app.get('/delete-all', (req, res) => {
  employees = [];
  res.redirect('/');
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
