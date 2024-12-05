import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  ProjectType,
} from './gtdApi';

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, error, isLoading } = useGetProjectQuery(id!);
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [editProject, setEditProject] = useState<ProjectType | null>(null);

  const handleEdit = () => {
    if (project) setEditProject(project);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editProject) {
      await updateProject({ id: editProject.id, project: editProject });
      setEditProject(null);
    }
  };

  const handleDelete = async () => {
    if (project) {
      await deleteProject(project.id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !project) return <div>Error: {error?.toString() || 'Not found'}</div>;

  return (
    <div>
      {editProject ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editProject.name}
            onChange={(e) =>
              setEditProject({ ...editProject, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <textarea
            value={editProject.description || ''}
            onChange={(e) =>
              setEditProject({ ...editProject, description: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-green-500 text-white p-2">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditProject(null)}
            className="bg-red-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <button onClick={handleEdit} className="bg-yellow-500 text-white p-2">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 ml-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Project;
