import Head from "next/head";
import DemoNavigation from "@/components/demonav";
import useKeyboard from "@/components/useKeyboard";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import styles from "@styles/Demo.module.css"

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
                        position={[0, 0, 2]}
                        intensity={2}
                        color="white"
                    />
                    <mesh>
                        <planeGeometry args={[200,200]}/>
                        <meshBasicMaterial color="gray"/>
                    </mesh>
                    <OrbitControls />
                    <OrthographicCamera 
                        makeDefault
                        zoom={1}
                        left={-5}
                        right={5}
                        top={2}
                        bottom={-2}
                        position={[0,0,2]}
                    />
                    <User />
                </Canvas>
            </div>
            <DemoNavigation 
                back="/demo/page0"
                forward="/demo/page2"
                words="api get"
            />
        </main>
    </>
}

function User(props) {
    const mesh = useRef()
    const keyMap = useKeyboard()

    useFrame((_, delta) => {
        keyMap['KeyA'] && (mesh.current.position.x -= 2 * delta)
        keyMap['KeyD'] && (mesh.current.position.x += 2 * delta)
        keyMap['KeyW'] && (mesh.current.position.y += 2 * delta)
        keyMap['KeyS'] && (mesh.current.position.y -= 2 * delta)
    })

    return <>
        <mesh
            {...props}
            ref={mesh}
            position={[0, 0, 0]}
        >
            <boxGeometry />
            <meshStandardMaterial color="white"/>
        </mesh>
    </>
}