import styles from './userInfo.module.css'
import Image from 'next/image'

// children : stats
// imgID : profile pic
export default function UserInfo(props) {
    return(
        <div className={styles.container}>
            <Image 
                src={props.imgID}
                width={100}
                height={100}
                alt='wenomechainsuma'
            />
            {props.children}
        </div>
    )
}