'use client'
import React, { useEffect ,useState} from 'react'
import styles from './page.module.css'
import Image from "next/image";
import { Metadata } from 'next';

async function getData(id) {
  console.log(id);
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

// export async function generateMetadata({params}){
//   const data = await getData(params.id);
//   return {
//     title: data.title,
//     description: data.desc,
//   }
// }

const BlogPost = ({params}) => {
  const [data,setData] = useState({})
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    async function fetchData() {
      try {
        const fetchedData = await getData(params.id);
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchData();
  },[])

  if(loading){
    return (
      <>
      <h1 style={{display: 'flex', alignItems: 'center' , justifyContent: 'center'}}>Loading...</h1> 
      </>
    )
  }


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
          {data.desc}
          </p>
          <div className={styles.author}>
            <Image
              src={data.image}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.image}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
         {data.content}
        </p>
      </div>
    </div>
  )
}

export default BlogPost
