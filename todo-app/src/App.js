import React, { useState, useEffect } from 'react';
import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';
import Filter from './Components/Filter';
import './Styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [lastDeletedTodo, setLastDeletedTodo] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    setLastDeletedTodo(todoToDelete);
    setTodos(todos.filter((todo) => todo.id !== id));

    // Seting a timeout to clear the last deleted todo after 5 seconds
    const timeout = setTimeout(() => {
      setLastDeletedTodo(null);
    }, 5000); // 5 seconds
    setUndoTimeout(timeout);
  };

  const undoDelete = () => {
    if (lastDeletedTodo) {
      setTodos([...todos, lastDeletedTodo]);
      setLastDeletedTodo(null);
      clearTimeout(undoTimeout); // Clear the timeout when undo is triggered
    }
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>TO-DO APP</h1>
      <AddTodo addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
      {lastDeletedTodo && (
        <div className="undo-container">
              <button onClick={undoDelete}>Undo</button>
        </div>
      )}
    </div>
  );
}

export default App;
