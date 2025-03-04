"use client";

import { useEffect, useState } from "react";
import Menu from "../../../components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import EditForm from "@/components/editform/EditForm";
import MenuPosts from "@/components/menuPosts/MenuPosts";

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const SinglePage = ({ params }) => {
  const { slug } = params;
  const [data, setData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [slug]);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = async (slug) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Post Deleted Successfully!");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <button className={styles.editbutton} onClick={handleEditClick}>
            Edit Post
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(slug)}
          >
            Delete Post
          </button>
          {showEdit && (
            <EditForm data={data} slug={slug} setShowEdit={setShowEdit} />
          )}
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: data?.desc }}
        />
      </div>
      <div className={styles.bottomSinglePage}>
        <Comments postSlug={slug} />
        <MenuPosts />
      </div>
    </div>
  );
};

export default SinglePage;
