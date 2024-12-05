import React, { useState } from 'react';
import {
  useGetContextsQuery,
  useCreateContextMutation,
  ContextType,
} from './gtdApi';
import { Link } from 'react-router-dom';

const Contexts = () => {
  const { data: contexts, error, isLoading } = useGetContextsQuery();
  const [createContext] = useCreateContextMutation();
  const [contextName, setContextName] = useState('');

  const handleCreateContext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contextName.trim()) {
      await createContext({ name: contextName });
      setContextName('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Contexts</h1>
      <form onSubmit={handleCreateContext} className="mb-4">
        <input
          type="text"
          value={contextName}
          onChange={(e) => setContextName(e.target.value)}
          placeholder="New context name"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Create Context
        </button>
      </form>
      <ul>
        {contexts?.map((context: ContextType) => (
          <li key={context.id} className="mb-2">
            <Link to={`/gtd/contexts/${context.id}`}>{context.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contexts;
