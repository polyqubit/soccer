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
                    <OrbitControlsToggle />
                    <CreateUser />
                </Canvas>
            </div>
            <DemoNavigation
                back="/demo/page1"
                forward="/"
                words="mongo stuff"
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

function OrbitControlsToggle() {
    const [show, setShow] = useState(false)
    const keyMap = useKeyboard()

    useFrame((_, delta) => {
        if(keyMap['KeyQ'] && !show) setShow(true)
    })

    return show && <OrbitControls />
}

function User(props) {
    const mesh = useRef(null)
    const keyMap = useKeyboard()

    useFrame((_, delta) => {
        keyMap['KeyA'] && (mesh.current.position.x -= 3 * delta)
        keyMap['KeyD'] && (mesh.current.position.x += 3 * delta)
        keyMap['KeyW'] && (mesh.current.position.y += 3 * delta)
        keyMap['KeyS'] && (mesh.current.position.y -= 3 * delta)

        if(((mesh.current.position.x < -5)||(mesh.current.position.x > 5))
        || (mesh.current.position.y < -3)||(mesh.current.position.y > 3)) {
            mesh.current.position.x = 0
            mesh.current.position.y = 0
        }
    })

    return <>
        <mesh
            {...props}
            ref={mesh}
            position={props.position}
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
    const [touched, setTouched] = useState(1)
    const [id, setID] = useState(0)

    useFrame((_, delta) => {
        if(mesh.current) {
            mesh.current.rotation.z += delta 
            const intersections = raycast()
            //console.log(intersections)
            if ((intersections.length > 0) && (touched !== 0)) {
                let name = prompt("Enter name of user: ")
                if(((name === null) || (name.length < 3)) && (touched === 1)) {
                    alert("name not long enough")
                    setTouched(-1)
                }
                else if(((name === null) || (name.length < 3)) && (touched === -1)) {
                    alert("name not long enough")
                    setTouched(1)
                }
                else if(touched != 0) {
                    mesh.current.position.z = -2
                    setTouched(0)
                    fetch("../api/createUser?name=" + name)
                        .then((response) => response.json())
                        .then((body) => {setID(parseInt(body['user']['insertedId'])); console.log(typeof body['user']['insertedId'])})
                }
                console.log(touched)
            }
        }
    })

    return <>
        <mesh
            ref={mesh}
            position={[-1,touched,(touched === 0) ? -2 : 0]}
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial side={DoubleSide} color="blue" />
        </mesh>
        {(touched === 0)&&<EditPass id={id}/>}
    </>
}

function EditPass(props) {
    const mesh = useRef(null)
    const raycast = useForwardRaycast(mesh)
    const [touched, setTouched] = useState(1)

    useFrame((_, delta) => {
        if(mesh.current) {
            mesh.current.rotation.z += delta 
            const intersections = raycast()
            //console.log(intersections)
            if ((intersections.length > 0) && (touched !== 0)) {
                let pow = prompt("Enter pwd: ")
                if((pow === null) && (touched === 1)) {
                    alert("name not long enough")
                    setTouched(-1)
                }
                else if((pow === null) && (touched === -1)) {
                    alert("name not long enough")
                    setTouched(1)
                }
                else if(touched != 0) {
                    mesh.current.position.z = -2
                    setTouched(0)
                    fetch("../api/editUser?id=" + props.id + "&pow=" + pow)
                }
                console.log(touched)
            }
        }
    })

    return <>
        <mesh
            ref={mesh}
            position={[1.2,(touched*1.1)+0.5,(touched === 0) ? -2 : 0]}
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial side={DoubleSide} color="green" />
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