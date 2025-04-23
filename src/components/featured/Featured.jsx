import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Exposing Marine Poaching</b> Saving Our Oceans, One Story at a Time.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image
            src="/fin.jpg"
            alt=""
            sizes="(max-width: 1000px) 100vw, 50vw"
            fill
            className={styles.image}
          />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            The Hidden Crisis: Marine Poaching Threatening Our Oceans
          </h1>
          <p className={styles.postDesc}>
            Marine poaching is pushing many ocean species to the brink of
            extinction. Illegal fishing and wildlife exploitation continue to
            damage delicate marine ecosystems. By shedding light on these
            crimes, we can drive action and protect marine biodiversity for
            future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
