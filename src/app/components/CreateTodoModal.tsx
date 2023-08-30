"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Todo } from '../todo/page';
import { useClerk } from '@clerk/nextjs';
import CryptoJS from 'crypto-js';

interface Props {
  closeModal: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: () => void;
}

const CreateTodoModal: React.FC<Props> = ({ closeModal, setTodos, fetchTodos }) => {
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false); // New state for loading
  const clerk = useClerk();

  const { user } = clerk;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate fields before submitting
    if (!title) {
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      await axios.post('/api/todo', { title:CryptoJS.AES.encrypt(title, process.env.SECRET_KEY as string).toString(), userId: user?.id });
      fetchTodos();
    } catch (error) {
      console.error('Error creating todo:', error);
    }

    closeModal();
    setTitle('');
    setIsLoading(false); // End loading state
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-2">Create a New Todo</h2>
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-3 py-1 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading} // Disable the button during loading
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
