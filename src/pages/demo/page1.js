import Head from "next/head";
import DemoNavigation from "@/components/demonav";
import useKeyboard from "@/components/useKeyboard";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import { Raycaster, Vector3, DoubleSide } from "three";
import styles from "@styles/Demo.module.css"
import clientPromise from "@/lib/mongodb";

export default function Page1({user}) {
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
                    <User setText={setText} text={user}/>
                    <mesh position={[0, 1, 0]}>
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                        <meshStandardMaterial color="green" side={DoubleSide}/>
                    </mesh>
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

// async function getUser(name) {
//     const info = await fetch("../api/findUser?name="+name)
//         .then(response => response.json())
//         .then(response => JSON.stringify(response))
//     return { info: info}
// }

// async function getUser(name) {

//     let loginData = await fetch("../api/findUser?name="+name, { method : 'POST' }) // headers : headerParams, body: bodyParams 
//         .then((response) => response.json())
//         .then(data => {
//             //return data['retrieve-agent'];
//             return data
//         });
//     // console.log('loginData ===>', loginData.agent);
//     return {
//         type: 'GET_AGENT_DETAILS',
//         payload: loginData
//     }

// }

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
    const raycast = useForwardRaycast(mesh)
    const [touched, setTouched] = useState(0)

    //const { payload } = getUser("init2")

    // const [data, setData] = useState();

    // useEffect(() => {
    //     fetch("../api/findUser?name="+"init").then(response => {
    //         setData(response.json())
    //     })
    // }, [])

    // const handleGetUser = async (name) => {
    //     try {
    //         let response = await fetch("http://localhost:3000/api/findUser?id=" + name);
    //         response = await response.json();
    //         return response
    //     } catch (error) {
    //         console.log("An error occurred while fetching ", error);
    //     }
    // };

    useFrame((_, delta) => {
        keyMap['KeyA'] && (mesh.current.position.x -= 3 * delta)
        keyMap['KeyD'] && (mesh.current.position.x += 3 * delta)
        keyMap['KeyW'] && (mesh.current.position.y += 3 * delta)
        keyMap['KeyS'] && (mesh.current.position.y -= 3 * delta)
        const intersections = raycast()
        if((intersections.length === 1) && (touched === 0)) {
            setTouched(1)
            console.log(props.text)
            //console.log(user["<value>"])
            props.setText(
                <p>
                    name: {props.text[0].name}<br/>
                    password: {props.text[0].pow}<br/>
                    high score: {props.text[0].sc}
                </p>
            )
            console.log("complete")
        }
    })

    return <>
        <mesh
            {...props}
            ref={mesh}
            position={[0, 0, 0.1]}
        >
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="white" />
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
        return raycaster.intersectObjects(scene.children)
    }
}