// import { getUsers } from "@/lib/mongodb/data";

// const handler = async (req, res) => {
//     if (req.method === 'GET') {
//         try {
//             const { data, error } = await getUsers()
//             if (error) {
//                 throw new Error(error)
//             }
//             return res.status(200).json({ data })
//         } catch (error) {
//             return res.status(500).json({ error: error.message })
//         }
//     }
//     res.setHeader('Allow', ['GET'])
//     res.status(405).end(`method ${req.method} is not allowed`)
// }

// export default handler

import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise
        const db = client.db('data')
        const { name } = req.query

        const user = await db.collection('users')
            .find({ name: name })
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return res.status(200).json({ user })
    } catch(e) {
        return res.status(500).json({ error: e.message })
    }
}