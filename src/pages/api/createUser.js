import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise
        const db = client.db('data')
        const { name } = req.query

        const user = await db.collection('users').insertOne({
            name: name,
            pow: "",
            sc: 0
        })
        return res.status(200).json({ user })
    } catch(e) {
        return res.status(500).json({ error: e.message })
    }
}