"use client";

import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession();

  const handleCloseMenu = () => setOpen(false);

  return (
    <>
      {/* Desktop links */}
      <div className={styles.desktopLinks}>
        {status === "unauthenticated" ? (
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        ) : (
          <>
            {session?.user?.role === "admin" && (
              <Link href="/write" className={styles.link}>
                Write
              </Link>
            )}
            <span className={styles.link} onClick={() => signOut()}>
              Logout
            </span>
          </>
        )}
      </div>

      {/* Burger icon */}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Responsive menu */}
      <div className={`${styles.responsiveMenu} ${open ? styles.open : ""}`}>
        <div onClick={handleCloseMenu}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </div>
        <div onClick={handleCloseMenu}>
          <Link href="/report" className={styles.link}>
            Report
          </Link>
        </div>

        {status === "unauthenticated" ? (
          <div onClick={handleCloseMenu}>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          </div>
        ) : (
          <>
            {session?.user?.role === "admin" && (
              <div onClick={handleCloseMenu}>
                <Link href="/write" className={styles.link}>
                  Write
                </Link>
              </div>
            )}
            <span
              className={styles.link}
              onClick={() => {
                signOut();
                handleCloseMenu();
              }}
            >
              Logout
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default AuthLinks;
