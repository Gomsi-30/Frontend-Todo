'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { FaBold, FaItalic, FaUnderline, FaTrashAlt, FaPlus } from 'react-icons/fa';

export default function TodoDetails({ todo, onDeleteTodo, onUpdateTodo }) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: '',
    description: '',
  });

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (todo) {
      setUpdatedTodo({
        title: todo.title || '',
        description: todo.description || '',
      });
    }
  }, [todo]);

  const handleDelete = async () => {
    if (todo) {
      try {
        await fetch(`https://backend-todo-three.vercel.app/todo/${todo._id}`, {
          method: 'DELETE',
        });
        if (onDeleteTodo) onDeleteTodo(todo._id);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://backend-todo-three.vercel.app/todo/${todo._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (onUpdateTodo) onUpdateTodo(updatedTodo);
      setShowUpdateForm(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="border-2 h-full p-5">
      <div className='border-b bg-black p-5'>
        <h1 className='text-2xl text-bold text-white'>Todo Details</h1>
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex items-center mb-4">
          <button
            onClick={() => setIsBold(prev => !prev)}
            className={`p-2 ${isBold ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <FaBold />
          </button>
          <button
            onClick={() => setIsItalic(prev => !prev)}
            className={`p-2 ${isItalic ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <FaItalic />
          </button>
          <button
            onClick={() => setIsUnderline(prev => !prev)}
            className={`p-2 ${isUnderline ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <FaUnderline />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-500 ml-4"
          >
            <FaTrashAlt />
          </button>
          <button
            onClick={() => setShowUpdateForm(prev => !prev)}
            className="p-2 text-green-500 ml-2"
          >
            <FaPlus />
          </button>
        </div>
        {!showUpdateForm ? (
          <div>
            <h2 className={`text-2xl ${isBold ? 'font-bold' : 'font-normal'} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}>
              {todo.title}
            </h2>
            <p className={`${isBold ? 'font-bold' : 'font-normal'} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}>
              {todo.description}
            </p>
            <p className="text-gray-500">{todo.date}</p>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="mt-4">
            <h2 className="text-lg font-bold mb-2">Update Todo</h2>
            <div className="flex items-center mb-2">
              <button
                type="button"
                onClick={() => setIsBold(prev => !prev)}
                className={`p-2 ${isBold ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <FaBold />
              </button>
              <button
                type="button"
                onClick={() => setIsItalic(prev => !prev)}
                className={`p-2 ${isItalic ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <FaItalic />
              </button>
              <button
                type="button"
                onClick={() => setIsUnderline(prev => !prev)}
                className={`p-2 ${isUnderline ? 'text-blue-500' : 'text-gray-500'}`}
              >
                <FaUnderline />
              </button>
            </div>
            <input
              type="text"
              name="title"
              value={updatedTodo.title}
              onChange={handleChange}
              placeholder="Title"
              className={`w-full p-2 border border-gray-300 rounded mb-2 ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
              required
            />
            <textarea
              name="description"
              value={updatedTodo.description}
              onChange={handleChange}
              placeholder="Description"
              className={`w-full p-2 border border-gray-300 rounded mb-2 ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              Update Todo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
