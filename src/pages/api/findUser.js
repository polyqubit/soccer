import clientPromise from "@/lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise
        const db = client.db('data')
        const { name } = req.query

        const user = await db.collection('users')
            .find({ name: name })
            .project({_id: 0, name: 1, pow: 1, sc: 1})
            //.map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        return res.status(200).json({ user })
    } catch(e) {
        return res.status(500).json({ error: e.message })
    }
}