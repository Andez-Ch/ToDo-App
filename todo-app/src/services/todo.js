import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore/lite";

//upload image
export const uploadImage = async (image) => {
  const imageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(imageRef, image);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};

//add todo
export const addTodoData = async (data) => {
  const todoRef = await addDoc(collection(db, "todos"), data);
  return todoRef;
};


// new
// import React, { useState } from "react";
// import "../Styles/AddTodo.css";
// import { addTodoData, uploadImage } from "../services/todo";

// function AddTodo({ addTodo }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleImageChange = (e) => {
//     if (e.target.files[0]) {
//       const selectedImage = e.target.files[0];
//       setImage(selectedImage);

//       // Create a preview of the image
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(selectedImage);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let imageUrl = "";
//     if (image) {
//       imageUrl = await uploadImage(image);
//     }

//     const todoData = {
//       title: title,
//       description: description,
//       imageUrl: imageUrl,
//       completed: false,
//     };

//     try {
//       const response = await addTodoData(todoData);
//       if (response) {
//         console.log(todoData);
//         setDescription("");
//         setTitle("");
//         setImage(null);
//       } else {
//         throw new Error("some thign is wrong");
//       }
//     } catch (e) {
//       console.log("Error adding todo: ", e);
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit} className="add-todo-form">
//         <div className="input-group">
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="input-field"
//             required
//           />
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="input-field"
//             required
//           ></textarea>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             accept="image/*"
//             className="input-field"
//           />

//           <button type="submit" className="add-button">
//             Add Todo
//           </button>
//         </div>
//       </form>

//       {imagePreview && (
//         <div>
//           <h3>Image Preview:</h3>
//           <img
//             src={imagePreview}
//             alt="Preview"
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default AddTodo;
