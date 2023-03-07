import Head from "next/head";
import DemoNavigation from "@/components/demonav";
import useKeyboard from "@/components/useKeyboard";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import { Raycaster, Vector3, DoubleSide } from "three";
import styles from "@styles/Demo.module.css"
import clientPromise from "@/lib/mongodb";

export default function Page1({ user }) {
    const [text, setText] = useState(<p>test box</p>)
    return <>
        <Head>
            <title>Demo</title>
        </Head>
        <main>
            <div className={styles.follow}>
                {text}
            </div>
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
                    <User />
                    <mesh>
                        <planeGeometry args={[200, 200]} />
                        <meshBasicMaterial color="gray" />
                    </mesh>
                    <OrthographicCamera
                        makeDefault
                        zoom={1}
                        left={-5}
                        right={5}
                        top={2}
                        bottom={-2}
                        position={[0, 0, 8]}
                    />
                    <OrbitControls />
                    <CreateUser setText={setText} text={user} />
                </Canvas>
            </div>
            <DemoNavigation
                back="/demo/page1"
                forward="/"
                words="create/delete user"
            />
        </main>
    </>
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("data");

        const user = await db
            .collection("users")
            .find({})
            .limit(1)
            .toArray();

        return {
            props: { user: JSON.parse(JSON.stringify(user)) },
        };
    } catch (e) {
        console.error(e);
    }
}

function User(props) {
    const mesh = useRef(null)
    const keyMap = useKeyboard()

    useFrame((_, delta) => {
        keyMap['KeyA'] && (mesh.current.position.x -= 3 * delta)
        keyMap['KeyD'] && (mesh.current.position.x += 3 * delta)
        keyMap['KeyW'] && (mesh.current.position.y += 3 * delta)
        keyMap['KeyS'] && (mesh.current.position.y -= 3 * delta)
    })

    return <>
        <mesh
            {...props}
            ref={mesh}
            position={[0, 0, 0.1]}
            name="userBox"
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial side={DoubleSide} color="white" />
        </mesh>
    </>
}

function CreateUser(props) {
    const mesh = useRef(null)
    const raycast = useForwardRaycast(mesh)
    const [touched, setTouched] = useState(0)

    useFrame((_, delta) => {
        const intersections = raycast()
        //console.log(intersections)
        if ((intersections.length > 0) && (touched === 0)) {
            setTouched(1)
            mesh.current.position.z = -1
            
            console.log("complete")
        }
        mesh.current.rotation.z += delta
    })

    return <>
        <mesh
            {...props}
            ref={mesh}
            position={[-1, 1, 0]}
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial side={DoubleSide} color="blue" />
        </mesh>
    </>
}

const useForwardRaycast = (obj) => {
    const raycaster = useMemo(() => new Raycaster(), [])
    const pos = useMemo(() => new Vector3(), [])
    const dir = useMemo(() => new Vector3(), [])
    const scene = useThree((state) => state.scene)

    return () => {
        if (!obj.current) return []
        raycaster.set(obj.current.getWorldPosition(pos), obj.current.getWorldDirection(dir))
        let user = scene.getObjectByName("userBox")
        return raycaster.intersectObject(user, true)
    }
}