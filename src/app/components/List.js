// pages/todos/index.js
'use client'
import React, { useState, useEffect } from 'react';

export default function TodoList({ onSelectTodo }) {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
   
  });

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://backend-todo-three.vercel.app/get?page=${page}`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://backend-todo-three.vercel.app/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      setNewTodo({ title: '', description: ''});
      setShowForm(false);
      // Optionally, refetch todos to include the newly created one
      const response = await fetch(`https://backend-todo-three.vercel.app/get?page=${page}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <div className='w-full ml-5 flex flex-col md:flex-row md:gap-[200px]'>
        <button onClick={toggleForm} className='w-full md:w-[170px] px-3 py-2 md:px-6 md:py-1 bg-black text-white text-xl md:text-1xl rounded-lg'>
          {showForm ? 'Cancel' : 'Todo'}
        </button>
       
      </div>
      
      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">Create New Todo</h2>
          <input
            type="text"
            name="title"
            value={newTodo.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <textarea
            name="description"
            value={newTodo.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">
            Add Todo
          </button>
        </form>
      )}

      {/* Todo Items */}
      {loading ? (
        <p className="text-center my-4">Loading...</p>
      ) : (
        todos.map((todo) => (
          <div key={todo.id} onClick={() => onSelectTodo(todo)} className="p-4 m-5 w-full h-[84px] border-2 hover:bg-gray-100 cursor-pointer">
            <h2 className="font-bold text-md">{todo.title}</h2>
            <p className="text-gray-500 text-sm">{todo.description}</p>
            <p className="text-gray-400 text-sm">Created: {new Date(todo.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4 ml-5">
        <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 bg-black text-white rounded disabled:opacity-50">
          Previous
        </button>
        <button onClick={handleNextPage} className="px-4 py-2 bg-black text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
}