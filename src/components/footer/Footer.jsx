import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/fin.jpg" alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>Marine Poaching</h1>
        </div>

        <p className={styles.desc}>Marine Poaching 2025 ©</p>
        <p className={styles.desc}>All rights reserved.</p>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Marine Life</Link>
          <Link href="/">Sustainability</Link>
          <Link href="/">Poaching</Link>
          <Link href="/">Conservation</Link>
          <Link href="/">Pollution</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
