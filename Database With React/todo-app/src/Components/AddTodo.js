import React, { useState } from 'react';
import '../Styles/AddTodo.css';
import { db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


function AddTodo ({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (image) {
      const imageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const newTodo = {
      title,
      description,
      image: imageUrl,
      completed: false,
    };

    const docRef = await addDoc(collection(db, 'todos'), newTodo);
    addTodo({ ...newTodo, id: docRef.id });

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
