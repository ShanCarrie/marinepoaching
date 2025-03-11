import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=marinelife"
        className={`${styles.categoryItem} ${styles.marinelife}`}
      >
        Marine Life
      </Link>
      <Link
        href="/blog?cat=sustainability"
        className={`${styles.categoryItem} ${styles.sustainability}`}
      >
        Sustainability
      </Link>
      <Link
        href="/blog?cat=poaching"
        className={`${styles.categoryItem} ${styles.poaching}`}
      >
        Poaching
      </Link>
      <Link
        href="/blog?cat=conservation"
        className={`${styles.categoryItem} ${styles.conservation}`}
      >
        Conservation
      </Link>
      <Link
        href="/blog?cat=pollution"
        className={`${styles.categoryItem} ${styles.pollution}`}
      >
        Pollution
      </Link>
    </div>
  );
};

export default MenuCategories;
