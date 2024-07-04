import React, { useState } from 'react';
import '../Styles/AddTodo.css';

function AddTodo({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      title,
      description,
      image: image ? URL.createObjectURL(image) : null,
      completed: false,
    };

    addTodo(newTodo);

    setTitle('');
    setDescription('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="input-field"
        required
      ></textarea>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="input-field"
        />
        <button type="submit" className="add-button">
          Add Todo
        </button>
      </div>
      
    </form>
  );
}

export default AddTodo;
