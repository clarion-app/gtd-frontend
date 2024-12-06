import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetActionQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  ActionType,
  useGetProjectsQuery,
  useGetProjectQuery
} from './gtdApi';

const Action = () => {
  const { id } = useParams<{ id: string }>();
  const { data: action, error, isLoading } = useGetActionQuery(id!);
  const { data: projects, isLoading: isProjectsLoading, error: projectsError } = useGetProjectsQuery();
  const [updateAction] = useUpdateActionMutation();
  const [deleteAction] = useDeleteActionMutation();
  const [editAction, setEditAction] = useState<ActionType | null>(null);
  const { data: project } = useGetProjectQuery(action?.project_id || '');

  const handleEdit = () => {
    if (action) setEditAction(action);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editAction) {
      await updateAction({ id: editAction.id, action: editAction });
      setEditAction(null);
    }
  };

  const handleDelete = async () => {
    if (action) {
      await deleteAction(action.id);
    }
  };

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editAction) {
      setEditAction({ ...editAction, project_id: e.target.value || undefined });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !action) return <div>Error: {error?.toString() || 'Not found'}</div>;

  return (
    <div className="container">
      {editAction ? (
        <form onSubmit={handleSave}>
          <div className="field">
            <label className="label">Action Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={editAction.title}
                onChange={(e) =>
                  setEditAction({ ...editAction, title: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                value={editAction.description || ''}
                onChange={(e) =>
                  setEditAction({ ...editAction, description: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Project</label>
            <div className="control">
              {isProjectsLoading && <div>Loading projects...</div>}
              {projectsError && <div>Error loading projects</div>}
              {projects && (
                <div className="select">
                  <select
                    value={editAction.project_id || ''}
                    onChange={handleProjectChange}
                  >
                    <option value="">No Project</option>
                    {projects.map((project: { id: string; name: string }) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">
                Save
              </button>
            </div>
            <div className="control">
              <button
                type="button"
                onClick={() => setEditAction(null)}
                className="button is-light"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <h2 className="title">{action.title}</h2>
          <p>{action.description}</p>
          {project && <p><strong>Project:</strong> {project.name}</p>}

          <div className="buttons">
            <button onClick={handleEdit} className="button is-warning">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="button is-danger"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Action;
