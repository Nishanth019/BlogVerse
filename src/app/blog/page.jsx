'use client'
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

async function getData() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const Blog = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if(loading){
    return (
      <>
      <h1 style={{display: 'flex', alignItems: 'center' , justifyContent: 'center'}}>Loading...</h1> 
      </>
    )
  }

  return (
    <div className={styles.mainContainer}>
      {data && data.map((item) => (
        <Link key={item._id} href={`/blog/${item._id}`} className={styles.container}>
          <div className={styles.imageContainer}>
            <Image
              src={item.image}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
