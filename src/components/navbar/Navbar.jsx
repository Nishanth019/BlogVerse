'use client'
import Link from 'next/link'
import React from 'react'
import styles from './Navbar.module.css'
import DarkModelToggle from '../DarkModeToggle/DarkModelToggle'
import { signOut, useSession } from 'next-auth/react'

const links = [
    {
        id:1,
        title: "Home",
        url: "/"
    },
    {
        id:2,
        title: "Portfolio",
        url: "/portfolio"
    },
    {
        id:3,
        title: "Blog",
        url: "/blog"
    },
    {
        id:4,
        title: "About",
        url: "/about"
    },
    {
        id:5,
        title: "Contact",
        url: "/contact"
    },
    {
        id:6,
        title: "Dashboard",
        url: "/dashboard"
    }
]

const Navbar = () => {
    const session = useSession();
  return (
    <div className={styles.container}>
        <Link href='/' className={styles.logo}>BlogVerse</Link>
        <div className={styles.links}>
            <DarkModelToggle className={styles.darkmode}/>
            {
                links.map((link)=>(
                    <Link href={link.url} key={link.id} className={styles.link}>{link.title}</Link>
                ))
            }
            { session.status === "authenticated" && (
            <button
            className={styles.logout}
            onClick={signOut}>
                Logout
            </button>
            )
            }
        </div>
    </div>
  )
}

export default Navbar
