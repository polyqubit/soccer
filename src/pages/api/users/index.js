import { getUsers } from "@/lib/mongodb/data";

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const { data, error } = await getUsers()
            if (error) {
                throw new Error(error)
            }
            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`method ${req.method} is not allowed`)
}

export default handler