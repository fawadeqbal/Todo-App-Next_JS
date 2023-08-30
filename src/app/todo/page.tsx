"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTodoModal from '../components/CreateTodoModal';
import EditTodoModal from '../components/EditTodoModal';
import { useAuth, useClerk} from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Todo from '@/models/todoModel';
import {toast} from 'react-toastify'


const ITEMS_PER_PAGE=5;
export type Todo = {
  _id: string;
  title: string;
  userId: string;
  completed: boolean;
};

export default function TodoPage() {
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [updateTodo, setUpdateTodo] = useState<Todo>();
  const user= useAuth()
  const router=useRouter()
  const clerk=useClerk()

  const [currentPage, setCurrentPage] = useState(1);

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
  }, [clerk.user?.id]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/api/todo/${clerk.user?.id}`); // Replace with your backend API endpoint
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await axios.delete(`/api/todo/${todoId}`); // Corrected endpoint
     
      await fetchTodos()
      toast.success("Todo deleted successfully")
      
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const maxPage = Math.ceil(todos.length / ITEMS_PER_PAGE);

  const paginatedTodos = todos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(todos.length, currentPage * ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  if(!user.isSignedIn){
    
    router.push('/signin')
    return(
      <div>
      <h1>unAutorized</h1>
      </div>
    )

  }

  
  return (
    <div className="p-8">
      <div className='flex justify-center items-center'>
      <h1 className="text-2xl font-semibold mb-3">Welcome {clerk.user?.fullName}</h1>
      </div>
      
      <h1 className='text-3xl font-semibold mb-3'>Todo List</h1>
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
          fetchTodos={fetchTodos}
        />
      )}
      {isModalOpen && (
        <CreateTodoModal setTodos={setTodos} closeModal={closeModal} fetchTodos={fetchTodos} />
      )}
      <div className="overflow-x-auto">
      <table className="w-full table-auto">
  <thead className="bg-gray-200">
    <tr>
      <th className="px-4 py-2 border">Title</th>
      <th className="px-4 py-2 border">Status</th>
      <th className="px-4 py-2 border">Actions</th>
    </tr>
  </thead>
  <tbody>
    {paginatedTodos.map(todo => (
      <tr key={todo._id} className="border-t">
        <td className="px-4 py-2 whitespace-nowrap border">{todo.title}</td>
        <td className="px-4 py-2 border">
        <button
        
        className={`text-${todo.completed ? 'green' : 'red'}-500`}
      >
        {todo.completed? 'Completed' : 'Not Completed'}
      </button>
    </td>
        <td className="px-4 py-2 border">
          <div className="flex space-x-2">
            <button
              onClick={() => openModalEdit(todo)}
              className="text-blue-500"
            >
              Edit
            </button>
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

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-200 px-3 py-1 rounded-md"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === maxPage}
            className="bg-gray-200 px-3 py-1 rounded-md"
          >
            Next
          </button>
          <div className="flex justify-center mt-4">
            <p className="mr-3 text-gray-600">
              Showing items {startIndex} - {endIndex} of {todos.length}
            </p>
            <p className="text-gray-600">
              Page {currentPage} of {maxPage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}






                   