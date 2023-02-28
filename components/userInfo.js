import styles from './layout.module.css'
import Image from 'next/image'
import soc from '@public/soccball.png'

// children : stats
// imgID : profile pic
export default function UserInfo(props) {
    return(
        <div className={styles.container}>
            <Image 
                src={soc} //change to props.src?
                width={400}
                height={400}
                alt='wenomechainsuma'
            />
            {props.children}
        </div>
    )
}