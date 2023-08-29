import React, { useState } from 'react';
import axios from 'axios';
import { Todo } from '../todo/page';

interface Props {
  closeModal: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  fetchTodos: ()=> void;
}

const CreateTodoModal: React.FC<Props> = ({ closeModal, setTodos,fetchTodos }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate fields before submitting
    if (!title || !description) {
      return;
    }

    try {
       await axios.post('/api/todo', { title, description });
      fetchTodos();
      // setTodos(prev => [
      //   ...prev,
      //   {
      //     _id: response.data._id,
      //     title,
      //     description,
      //     completed: false,
      //   },
      // ]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }

    closeModal();
    setTitle('');
    setDescription('');
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
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoModal;
