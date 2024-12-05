import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetContextQuery,
  useUpdateContextMutation,
  useDeleteContextMutation,
  ContextType,
} from './gtdApi';

const Context = () => {
  const { id } = useParams<{ id: string }>();
  const { data: context, error, isLoading } = useGetContextQuery(id!);
  const [updateContext] = useUpdateContextMutation();
  const [deleteContext] = useDeleteContextMutation();
  const [editContext, setEditContext] = useState<ContextType | null>(null);

  const handleEdit = () => {
    if (context) setEditContext(context);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editContext) {
      await updateContext({ id: editContext.id, context: editContext });
      setEditContext(null);
    }
  };

  const handleDelete = async () => {
    if (context) {
      await deleteContext(context.id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !context) return <div>Error: {error?.toString() || 'Not found'}</div>;

  return (
    <div>
      {editContext ? (
        <form onSubmit={handleSave}>
          <input
            type="text"
            value={editContext.name}
            onChange={(e) =>
              setEditContext({ ...editContext, name: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <textarea
            value={editContext.description || ''}
            onChange={(e) =>
              setEditContext({ ...editContext, description: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button type="submit" className="bg-green-500 text-white p-2">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditContext(null)}
            className="bg-red-500 text-white p-2 ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{context.name}</h2>
          <p>{context.description}</p>
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

export default Context;
