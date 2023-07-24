// Create web server

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Load data
const data = require('./data');

// Set port
const port = process.env.PORT || 3000;

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routes
app.get('/comments', (req, res) => {
  res.json(data.comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = data.comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  res.json(comment);
});

app.post('/comments', (req, res) => {
  const comment = {
    id: data.comments.length + 1,
    name: req.body.name,
    comment: req.body.comment,
  };
  data.comments.push(comment);
  res.json(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = data.comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  comment.name = req.body.name;
  comment.comment = req.body.comment;
  res.json(comment);
});

app.delete('/comments/:id', (req, res) => {
  const comment = data.comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found');
  const index = data.comments.indexOf(comment);
  data.comments.splice(index, 1);
  res.json(comment);
});

// Start server
app.listen(port, () => console.log(`Listening on port ${port}...`));