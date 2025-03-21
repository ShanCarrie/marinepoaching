"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
const AuthLinks = () => {
  const [open, setOpen] = useState(false);
  const { status, data: session } = useSession(); // Destructure both status and session
  return (
    <>
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
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Homepage</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              {session?.user?.role === "admin" && (
                <Link href="/write" className={styles.link}>
                  Write
                </Link>
              )}
              {/* This is where I moved the Logout button outside the admin condition */}
              <span className={styles.link} onClick={() => signOut()}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
};
export default AuthLinks;
