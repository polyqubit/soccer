import Head from "next/head";
import Link from "next/link";
import styles from "@styles/Demo.module.css"

export default function Demonstrative() {
    return <>
        <Head>
            <title>Demo</title>
        </Head>
        <main>
            <p className={styles.body}>
                hi
            </p>
        </main>
    </>
}