import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>@2023 BlogVerse. All rights reserved</div>
      <div className={styles.social}>
        <Image className={styles.icon} width={15} height={15} src="/1.png" alt="facebook account"/>
        <Image className={styles.icon} width={15} height={15} src="/2.png" alt="facebook account"/>
        <Image className={styles.icon} width={15} height={15} src="/3.png" alt="facebook account"/>
        <Image className={styles.icon} width={15} height={15} src="/4.png" alt="facebook account"/>
      </div>
    </div>
  )
}

export default Footer
