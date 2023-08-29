"use client"
import React, { useState } from 'react';
import { Todo } from '../todo/page';

type Props ={
  todo: Todo; // Pass the todo object you want to edit
  closeEditModal: () => void;
}

const EditTodoModal: React.FC<Props> = ({ todo, closeEditModal }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTodo = {
      ...todo,
      title,
      description,
      completed,
    };
    console.log(updatedTodo)
    // Handle the submission of the updated todo
    // updateTodo(updatedTodo);
    closeEditModal();
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
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoModal;
