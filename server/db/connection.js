import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    ssl: true,
});

let db;

async function connectToDatabase() {
    try {
        if (db) return db; // Return the existing connection if already connected

        await client.connect();
        await client.db("plants").command({ ping: 1 });
        console.log("Connected to MongoDB successfully!");

        db = client.db("plants"); // Assign the database instance for reuse
        return db;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

export default connectToDatabase;
