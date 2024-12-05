import React, { useState } from 'react';
import {
  useGetProjectsQuery,
  useCreateProjectMutation,
  ProjectType,
} from './gtdApi';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  const [createProject] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState('');

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      await createProject({ name: projectName });
      setProjectName('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.log(error.toString());
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <form onSubmit={handleCreateProject} className="mb-4">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="New project name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Project
        </button>
      </form>
      <ul>
        {projects?.map((project: ProjectType) => (
          <li key={project.id} className="mb-2">
            <Link to={`/gtd/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
