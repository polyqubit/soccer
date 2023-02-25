import clientPromise from ".";

let client
let db
let data

console.log('begin')

async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = await client.db('data')
        data = await db.collection('users')
    } catch (error) {
        throw new Error('failed to establish connection to db')
        //throw new Error(error.message)
    }
}

; (async () => {
    await init()
})()

export async function getUsers() {
    try {
        if (!data) await init()
        const result = await data
            .find({})
            .limit(10)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        //console.log(result)
        return { data: result }
    } catch (error) {
        return { error: 'failed to fetch data' }
    }
}