"use client"
import React, { useState } from 'react';
import { Todo } from '../todo/page';
import axios from 'axios';


type Props = {
  todo: Todo; // Pass the todo object you want to edit
  closeEditModal: () => void;
  fetchTodos: () => void;
};

const EditTodoModal: React.FC<Props> = ({ todo, closeEditModal, fetchTodos }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedTodo = {
      ...todo,
      title,
      completed,
    };

    try {
      await axios.put("/api/todo", updatedTodo);
      fetchTodos();
      closeEditModal();
    } catch (error) {
      console.error('Error updating todo:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Edit Todo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="completed" className="block font-semibold">
              Completed
            </label>
            <input
              type="checkbox"
              id="completed"
              name="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeEditModal}
              className="mr-2 bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
