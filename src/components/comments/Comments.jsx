"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const handleSubmit = async () => {
    if (!desc) return toast.error("Comment cannot be empty!");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ desc, postSlug }),
      });

      if (res.ok) {
        setDesc("");
        mutate();
        toast.success("Comment Added Successfully!");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Failed to add comment", err);
      toast.error("Failed to add comment");
    }
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    toast(
      ({ closeToast }) => (
        <div style={{ textAlign: "center" }}>
          <p>Are you sure you want to delete this comment?</p>
          <div style={{ marginTop: "10px" }}>
            <button
              style={{
                padding: "8px 12px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginRight: "10px",
              }}
              onClick={async () => {
                try {
                  const res = await fetch(`/api/comments?id=${id}`, {
                    method: "DELETE",
                  });

                  if (res.ok) {
                    toast.success("Comment Deleted Successfully!");
                    mutate();
                  } else {
                    const data = await res.json();
                    toast.error(data.message);
                  }
                } catch (err) {
                  console.error("Failed to delete comment", err);
                  toast.error("Failed to delete comment");
                }
                closeToast(); // Close the toast after action
              }}
            >
              Yes
            </button>
            <button
              style={{
                padding: "8px 12px",
                background: "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false, // Remove default close button
      }
    );
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Write a comment..."
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading ? (
          <p>Loading Comments...</p>
        ) : (
          data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.user}>
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>
                    {item.user.name || item.user.username}
                  </span>
                  <span className={styles.date}>{item.createdAt}</span>
                </div>
              </div>
              <p className={styles.desc}>{item.desc}</p>
              {(user?.role === "admin" || user?.email === item.userEmail) && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
