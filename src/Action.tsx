import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetActionQuery,
  useUpdateActionMutation,
  useDeleteActionMutation,
  ActionType,
} from './gtdApi';

const Action = () => {
  const { id } = useParams<{ id: string }>();
  const { data: action, error, isLoading } = useGetActionQuery(id!);
  const [updateAction] = useUpdateActionMutation();
  const [deleteAction] = useDeleteActionMutation();
  const [editAction, setEditAction] = useState<ActionType | null>(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error || !action) return <div>Error: {error?.toString() || 'Not found'}</div>;

  return (
    <div>
      {editAction ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editAction.title}
            onChange={(e) =>
              setEditAction({ ...editAction, title: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <textarea
            value={editAction.description || ''}
            onChange={(e) =>
              setEditAction({ ...editAction, description: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-green-500 text-white p-2">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditAction(null)}
            className="bg-red-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{action.title}</h2>
          <p>{action.description}</p>
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

export default Action;
