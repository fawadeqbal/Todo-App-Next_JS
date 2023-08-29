"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTodoModal from '../components/CreateTodoModal';
import EditTodoModal from '../components/EditTodoModal';

export type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [updateTodo, setUpdateTodo] = useState<Todo | undefined>();

  const openModalEdit = (todo: Todo) => {
    setIsModalEditOpen(true);
    setUpdateTodo(todo);
  };

  const closeEditModal = () => {
    setIsModalEditOpen(false);
    setUpdateTodo(undefined); // Reset the updateTodo state
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todo/read'); // Replace with your backend API endpoint
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`/api/todo/${todoId}`); // Corrected endpoint
      setTodos(todos.filter(todo => todo._id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleUpdateTodo = (updatedTodo: Todo) => {
    // Implement your logic to update the todo
    // For now, I'm just updating the todos state with the new todo
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Todo List</h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block"
      >
        Create Todo
      </button>
      {isModalEditOpen && (
        <EditTodoModal
          closeEditModal={closeEditModal}
          todo={updateTodo!}
        />
      )}
      {isModalOpen && <CreateTodoModal closeModal={closeModal} />}
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id} className="border-t">
              <td className="px-4 py-2">{todo.title}</td>
              <td className="px-4 py-2">{todo.description}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <button onClick={() => openModalEdit(todo)} className="text-blue-500">
                    Edit
                  </button>
                  {!todo.completed ? (
                    <button
                      
                      className="text-green-500"
                    >
                      Done
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoPage;
