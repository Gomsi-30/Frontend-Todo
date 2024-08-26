'use client'
import Sidebar from './Sidebar';
import TodoList from './List';
import TodoDetails from './Details';
import { useState } from 'react';

export default function Layout() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar at the top */}
      <div className="w-full">
        <Sidebar />
      </div>

      {/* Main content: TodoList and TodoDetails stacked horizontally */}
      <div className="flex flex-grow flex-col md:flex-row">
        {/* TodoList Section */}
        <div className="w-full md:w-1/3 p-4 md:p-10">
          <TodoList onSelectTodo={setSelectedTodo} />
        </div>

        {/* TodoDetails Section */}
        <div className="flex-grow p-4 md:p-10">
          {selectedTodo ? <TodoDetails todo={selectedTodo} /> : <p>Select a todo to see details</p>}
        </div>
      </div>
    </div>
  );
}
