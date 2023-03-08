import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("posts");
    const { id,pow } = req.query;

    const post = await db.collection("posts").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          password: pow,
        },
      }
    );

    res.json(post);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
};