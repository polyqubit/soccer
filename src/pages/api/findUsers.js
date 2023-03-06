import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise
        const db = client.db('data')

        const users = await db.collection('users')
            .find({})
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return res.status(200).json({ users })
    } catch(e) {
        return res.status(500).json({ error: e.message })
    }
}