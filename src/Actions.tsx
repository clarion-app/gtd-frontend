import React, { useState } from 'react';
import {
  useGetActionsQuery,
  useCreateActionMutation,
  ActionType,
} from './gtdApi';
import { Link } from 'react-router-dom';

const Actions = () => {
  const { data: actions, error, isLoading } = useGetActionsQuery();
  const [createAction] = useCreateActionMutation();
  const [actionTitle, setActionTitle] = useState('');

  const handleCreateAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (actionTitle.trim()) {
      await createAction({ title: actionTitle });
      setActionTitle('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Actions</h1>
      <form onSubmit={handleCreateAction} className="mb-4">
        <input
          type="text"
          value={actionTitle}
          onChange={(e) => setActionTitle(e.target.value)}
          placeholder="New action title"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Action
        </button>
      </form>
      <ul>
        {actions?.map((action: ActionType) => (
          <li key={action.id} className="mb-2">
            <Link to={`/gtd/actions/${action.id}`}>{action.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Actions;
