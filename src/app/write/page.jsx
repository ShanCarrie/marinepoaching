"use client";
import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const WritePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isVideo, setIsVideo] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (status === "authenticated" && session?.user?.role !== "admin") {
      alert("You are not authorized to access this page!");
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (!file) return;
    const storage = getStorage(app);
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setMedia(downloadURL);
        setUploading(false);
        setUploadProgress(0);
        if (file.type.startsWith("video")) {
          setIsVideo(true);
        } else {
          setIsVideo(false);
          setThumbnail(downloadURL);
        }
      }
    );
  }, [file]);

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="marinelife">Marine Life</option>
        <option value="sustainability">Sustainability</option>
        <option value="poaching">Poaching</option>
        <option value="pollution">Pollution</option>
        <option value="conservation">Conservation</option>
      </select>

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <label htmlFor="image" className={styles.addButton}>
              <Image src="/image.png" alt="" width={16} height={16} />
            </label>
          </div>
        )}
        {uploading && (
          <div className={styles.progressContainer}>
            <p>Uploading: {Math.round(uploadProgress)}%</p>
            <progress
              className={styles.progress}
              value={uploadProgress}
              max="100"
            ></progress>
          </div>
        )}
        {thumbnail && (
          <Image
            src={thumbnail}
            alt="Preview"
            className={styles.previewImage}
            onClick={() => isVideo && setShowVideo(true)}
            style={{ cursor: isVideo ? "pointer" : "default" }}
          />
        )}
        {showVideo && isVideo && (
          <div
            className={styles.videoModal}
            onClick={() => setShowVideo(false)}
          >
            <video controls src={media} autoPlay />
          </div>
        )}
        <ReactQuill
          className={styles.qlcontainer}
          theme="snow" // Change from "bubble" to "snow"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
          modules={{
            toolbar: [
              [{ font: [] }],
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          }}
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
