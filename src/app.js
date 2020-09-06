const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs} = req.body;
  const repository = { id: uuid(), title: title, url: url, techs: techs, likes: 0}
  repositories.push(repository);
  return res.json(repository).status(201);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs, likes } = req.body
  const repositoryIndex = repositories.findIndex(response => response.id == id) ;
  if(repositoryIndex < 0){
      return res.status(400).json({ error: ' repositório não encontrado'});
  }
  const like = repositories[repositoryIndex].likes ;
  const repository ={
      id,
      title,
      url,
      techs,
      like
  }

  repositories[repositoryIndex] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params ;
  const repositoryIndex = repositories.findIndex(response => response.id == id);
  if(repositoryIndex < 0){
     return res.status(400);
 }
 repositories.splice(repositoryIndex, 1);
 return res.status(204).send();
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(res => res.id == id);

  if(repositoryIndex < 0){
      return res.status(400);
  }
  repositories[repositoryIndex].likes++;
  return res.json(repositories[repositoryIndex]);
  
});

module.exports = app;
