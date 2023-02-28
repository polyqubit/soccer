import styles from './layout.module.css'

export default function UserInfo({ children }) {
    return <div className={styles.container}>{children}</div>;
}