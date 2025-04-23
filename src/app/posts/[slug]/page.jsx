"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import EditForm from "@/components/editform/EditForm";
import MenuPosts from "@/components/menuPosts/MenuPosts";
import MenuCategories from "@/components/menuCategories/MenuCategories";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getData = async (slug) => {
  const res = await fetch(`/api/posts/${slug}`, {
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
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(slug);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data", err);
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, [slug]);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleDelete = async (slug) => {
    const ConfirmToast = ({ closeToast }) => (
      <div style={{ textAlign: "center" }}>
        <p>Are you sure you want to delete this post?</p>
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
                const res = await fetch(`/api/posts/${slug}`, {
                  method: "DELETE",
                });

                if (res.ok) {
                  toast.success("Post Deleted Successfully!");
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 2000);
                } else {
                  toast.error("Failed to delete post");
                }
              } catch (err) {
                console.error("Failed to delete post", err);
                toast.error("Failed to delete post");
              }
              closeToast();
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
    );

    toast.info(<ConfirmToast />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: false,
    });
  };
  if (!data) return <div className={styles.loader}></div>;

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          {session?.user?.role === "admin" && (
            <>
              <button className={styles.editbutton} onClick={handleEditClick}>
                Edit Post
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(slug)}
              >
                Delete Post
              </button>
            </>
          )}

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
        <div>
          <MenuCategories />
          <MenuPosts />
        </div>
      </div>
      <div className={styles.bottomSinglePage}>
        <Comments user={session?.user} postSlug={slug} />
      </div>
    </div>
  );
};

export default SinglePage;
