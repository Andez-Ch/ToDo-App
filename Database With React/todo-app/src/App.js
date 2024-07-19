import React, { useState, useEffect } from "react";
import AddTodo from "./Components/AddTodo";
import TodoList from "./Components/TodoList";
import Filter from "./Components/Filter";
import "./Styles/App.css";
import { db } from "./firebase";
import {collection, getDocs, updateDoc, doc, deleteDoc,
  setDoc,} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lastDeletedTodo, setLastDeletedTodo] = useState(null);
  const [undoTimeout, setUndoTimeout] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 
        "todos"));
      const todosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),     }));
      setTodos(todosList);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    await updateDoc(doc(db, "todos", id), { completed: updatedTodo.completed });

    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    setLastDeletedTodo(todoToDelete);
    setTodos(todos.filter((todo) => todo.id !== id));

    // Delete the document from Firestore
    await deleteDoc(doc(db, "todos", id));

    const timeout = setTimeout(() => {
      setLastDeletedTodo(null);
    }, 5000);
    setUndoTimeout(timeout);
  };

  const undoDelete = async () => {
    if (lastDeletedTodo) {
      setTodos([...todos, lastDeletedTodo]);

      // Re-add the document to Firestore
      await setDoc(doc(db, "todos", lastDeletedTodo.id), lastDeletedTodo);

      setLastDeletedTodo(null);
      clearTimeout(undoTimeout);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    await updateDoc(doc(db, "todos", id), updatedTodo);

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
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
