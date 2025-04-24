"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage) => {
    const cat = searchParams.get("cat"); // get current category if exists
    const query = new URLSearchParams();

    if (cat) query.set("cat", cat);
    query.set("page", newPage);

    router.push(`?${query.toString()}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous
      </button>
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handlePageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
