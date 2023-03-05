import Head from "next/head";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import styles from "@styles/Demo.module.css"

export default function Page0() {
    return <>
        <Head>
            <title>Demo</title>
        </Head>
        <main>
            <div>
                <Canvas
                    shadows={false}
                    className={styles.canvas}
                    camera={{
                        position: [0, 0, 2],
                    }}
                >
                    <ambientLight intensity={0.2} />
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial />
                    </mesh>
                </Canvas>
            </div>
        </main>
    </>
}