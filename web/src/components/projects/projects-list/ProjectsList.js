import React, { useEffect, useState } from 'react';
import projectsService from '../../../services/projects.service';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    projectsService.list()
      .then((projects) => setProjects(projects))
      .catch(error => console.error(error))
  }, []);

  return (
    <>
      <h1>Project List</h1>
      {projects.map((project) => <div key={project.id}>{project.id}</div>)}
    </>
  )
}
