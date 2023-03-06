import Head from "next/head";
import DemoNavigation from "@/components/demonav";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import styles from "@styles/Demo.module.css"
import { useRef } from "react";

export default function Page0() {
    return <>
        <Head>
            <title>Demo</title>
        </Head>
        <main>
            <div
                className={styles.scene}
            >
                <Canvas
                    shadows={false}
                    className={styles.canvas}
                >
                    <ambientLight intensity={0.2} />
                    <pointLight
                        position={[1, 0.5, 2]}
                        intensity={2}
                        color="blue"
                    />
                    <pointLight
                        position={[-0.6, 0.5, 2]}
                        intensity={2}
                        color="red"
                    />
                    <pointLight
                        position={[0, 2, 3]}
                        intensity={0.1}
                        color="white"
                    />
                    <pointLight
                        position={[-1, 4, 1]}
                        intensity={0.8}
                        color="yellow"
                    />
                    <mesh>
                        <sphereGeometry />
                        <meshStandardMaterial />
                    </mesh>
                    <Donut />
                    <OrthographicCamera 
                        makeDefault
                        left={-710}
                        right={710}
                        top={370}
                        bottom={-370}
                        near={0.1}
                        far={1000}
                    />
                </Canvas>
            </div>
            <DemoNavigation />
        </main>
    </>
}

function Donut(props) {
    const mesh = useRef()
    useFrame((state, delta) => (mesh.current.rotation.x += delta))
    return <>
        <mesh
            {...props}
            ref={mesh}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
        >
            <torusGeometry args={[1.4, 0.1, 100, 100]} />
            <meshStandardMaterial />
        </mesh>
    </>
}