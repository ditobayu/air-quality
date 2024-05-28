import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: Request, res: Response) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    const database = client.db("tis"); // Choose a name for your database
    const collection = database.collection("air_quality"); // Choose a name for your collection
    const allData = await collection.find({}).toArray();

    return new Response(JSON.stringify(allData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client.close();
  }
}

export async function POST(req: Request, res: Response) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    const data = await req.json();
    const dataUpadated = { ...data, timestamp: new Date() };
    console.log(data);
    await client.connect();
    const database = client.db("tis");
    const collection = database.collection("air_quality");
    const result = await collection.insertOne(data);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client.close();
  }
}
