"use client";

import { useState } from "react";
import styles from "./editForm.module.css";

const EditForm = ({ data, slug }) => {
  const [title, setTitle] = useState(data?.title);
  const [desc, setDesc] = useState(data?.desc);
  const [img, setImg] = useState(data?.img);
  const [catSlug, setCatSlug] = useState(data?.catSlug);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = { title, desc, img, catSlug };

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Post Updated Successfully!");
        setShowEdit(false);
        window.location.reload(); // Refresh the page
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Edit Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
        required
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className={styles.textarea}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={img}
        onChange={(e) => setImg(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Category"
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Update Post
      </button>
    </form>
  );
};

export default EditForm;
