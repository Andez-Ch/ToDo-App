import React from 'react';
import '../Styles/TodoItem.css';

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <div className="todo-details">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        {todo.image && <img src={todo.image} alt={todo.title} />}
      </div>
      <button onClick={() => deleteTodo(todo.id)} className="delete-button">
        Delete
      </button>
      <button
        onClick={() =>
          updateTodo(todo.id, { title: 'Updated Title', description: 'Updated Description' })
        }
        className="update-button"
      >
        Update
      </button>
    </div>
  );
}

export default TodoItem;
