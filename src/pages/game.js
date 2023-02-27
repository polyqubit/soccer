import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import styles from '../styles/Game.module.css'
import aron from '@public/hanoolapirplane.jpg'

export default function Game() {
    return (
        <>
            <Head>
                <title>Play</title>
            </Head>
            <main className={styles.body}>
                <Link
                    href="/"
                    className={styles.back}
                >
                    &lt;Title screen
                </Link>
                
                <p className={styles.body}>
                    Hi this is game<br />The game will be developed sometime in the near future, stay tuned!
                </p>

                <div className={styles.imgContainer}>
                    <Image
                        src={aron}
                        width={100}
                        height={100}
                        alt="hanoolito"
                        className={styles.img}
                    />
                </div>
            </main>
        </>
    )
}

export default function CreateUser() {
    const [name, setName] = useState("")
}