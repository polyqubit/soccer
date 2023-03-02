import styles from './userInfo.module.css'
import Image from 'next/image'
import soc from '@public/soccball.png'

// children : stats
// imgID : profile pic
export default function UserInfo(props) {
    return(
        <div className={styles.container}>
            <Image 
                src={soc} //change to props.src?
                width={100}
                height={100}
                alt='wenomechainsuma'
            />
            {props.children}
        </div>
    )
}