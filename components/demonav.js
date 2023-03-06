import Link from "next/link";
import styles from "./nav.module.css"

export default function DemoNavigation(props) {
    return (
        <div className={styles.container}>
            <Link
                className={styles.back}
                href="/"
            >
                &larr;backward
            </Link>
            <div>
                <p className={styles.title}>
                    test
                </p>
            </div>
            <Link
                className={styles.forward}
                href="/demo/page1"
            >
                forward&rarr;
            </Link>
        </div>
    )
}