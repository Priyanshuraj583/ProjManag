const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 52443;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { username: 'dev', password: 'password', token: 'dev-token', role: 'developer' },
  { username: 'manager', password: 'password', token: 'manager-token', role: 'manager' }
];

const projects = [
  {
    id: 1,
    name: 'Project A',
    status: 'In Progress',
    focusNextWeek: 'Complete module X',
    tasks: [
      // { id: 1, desc: 'Task 1', status: 'in-progress' },
      // { id: 2, desc: 'Task 2', status: 'done' }
    ],
    team: 'Team 1'
  }
];

const forms = [
  { id: 1, name: 'Form A', team: 'Team 1' },
  { id: 2, name: 'Form B', team: 'Team 2' }
];

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ token: user.token, username: user.username, role: user.role });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/api/auth/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    res.status(400).send('User already exists');
  } else {
    const newUser = { username, password, token: `${username}-token`, role: 'developer' };
    users.push(newUser);
    res.json({ success: true, token: newUser.token });
  }
});

app.get('/api/forms', (req, res) => {
  res.json(forms);
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const { token, name, status, focusNextWeek, team } = req.body;
  const user = users.find(u => u.token === token);

  if (user && user.role === 'manager') {
    const newProject = { id: projects.length + 1, name, status, focusNextWeek, tasks: [], team };
    projects.push(newProject);
    res.json(newProject);
  } else {
    res.status(403).send('Only managers can add new projects');
  }
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { status, focusNextWeek, tasks } = req.body;
  const project = projects.find(p => p.id == id);
  if (project) {
    project.status = status;
    project.focusNextWeek = focusNextWeek;
    project.tasks = tasks;
    res.json(project);
  } else {
    res.status(404).send('Project not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});