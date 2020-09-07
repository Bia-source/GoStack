import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [ projects, setProject] = useState([]);

  useEffect(()=>{
      api.get('repositories').then(res =>{
        setProject(res.data);
      })
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
      title: `mais um curso ${Date.now()}`,
      url: "https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs#--desafio-02-conceitos-do-nodejs",
      techs: ["NodeJS", "React", "Adonis"]}).then(res =>{
      setProject([...projects, res.data]);
    })
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`).then(res =>{
      console.log(res.status);

      setProject(projects.filter(res => res.id != id))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(res => <li key={res.id}> {res.title} 
          <button onClick={() => handleRemoveRepository(res.id)}>
            Remover
          </button>
        </li>)}
          
         
         
      
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
