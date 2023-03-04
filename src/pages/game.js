import Head from 'next/head'
import Link from 'next/link'
import UserInfo from '@/components/userInfo'
import styles from '@styles/Game.module.css'
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

                <UserInfo
                    imgID={aron}
                >
                    <p>wenomechainsuma</p>
                    <p>wenomechainsuma</p>
                    <p>wenomechainsuma</p>
                    <p>wenomechainsuma</p>
                    <p>wenomechainsuma</p>
                </UserInfo>
                
            </main>
        </>
    )
}