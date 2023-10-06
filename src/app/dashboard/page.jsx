'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'
import styles from "./page.module.css";
import useSWR from 'swr';
import Image from 'next/image';

const Dashboard = () => {

  const session = useSession();

  const router = useRouter();

  // NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  let username = ''; // Initialize username with a default value

  if (session?.data?.user?.name) {
    username = session.data.user.name;
  }

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${username}`, fetcher)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const image = e.target[2].value;
    const content = e.target[3].value;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          image,
          content,
          username: session.data.user.name,
        })
      })
      mutate();
      e.target.reset();
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" })
    }
    catch (err) {
      console.log(err);
    }
  }

  if (session.status === "loading") {
    return <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder='Title' className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
        <div className={styles.posts}>
          {
            isLoading
              ? <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</p>
              : data?.map((post) => (
                <div className={styles.post} key={post._id}>
                  <div className={styles.imgContainer}>
                    <Image src={post.image} alt="" width={200} height={100} />
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <span
                    className={styles.delete}
                    onClick={() => handleDelete(post._id)}
                  >
                    X
                  </span>
                </div>
              ))
          }
        </div>
      </div>
    )
  }
}

export default Dashboard;
