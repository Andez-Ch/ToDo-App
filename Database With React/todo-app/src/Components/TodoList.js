import React from 'react';
import TodoItem from './TodoItem';
import '../Styles/TodoList.css';

function TodoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
