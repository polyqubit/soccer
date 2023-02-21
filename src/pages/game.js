import Head from "next/head"
import Link from "next/link"

export default function Game() {
    return (
        <>
            <Head>
                <title>Play</title>
            </Head>
            <main>
                <Link
                    href="/"
                >
                    &lt;Title screen
                </Link>
                <p>
                    Hi this is game
                </p>
            </main>
        </>
    )
}