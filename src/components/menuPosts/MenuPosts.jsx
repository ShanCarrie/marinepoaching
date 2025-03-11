"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menuPosts.module.css";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};

const MenuPosts = ({ withImage }) => {
  const { data, error } = useSWR("/api/posts/topviews", fetcher);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setItems(data);
    } else {
      setItems([]);
    }
  }, [data]);

  if (error) return <p>Failed to load posts</p>;
  if (!data) return <div className={styles.loader}></div>;

  return (
    <div className={styles.items}>
      {Array.isArray(items) &&
        items.map((item) => (
          <Link
            href={`/posts/${item.slug}`}
            key={item.id}
            className={styles.item}
          >
            {withImage && item.img && (
              <div className={styles.imageContainer}>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span
                className={`${styles.catSlug} ${
                  styles[item.catSlug.toLowerCase()]
                }`}
              >
                {item.catSlug}
              </span>
              <h3 className={styles.postTitle}>{item.title}</h3>
              <div className={styles.detail}>
                <span className={styles.date}>
                  - {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default MenuPosts;
