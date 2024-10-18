import express from "express";
import connectToDatabase from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Route to get all houseplants
router.get("/", async (req, res) => {
    try {
        const db = await connectToDatabase();  // Ensure connection is active
        const collection = db.collection("houseplants");
        const results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching houseplants:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route to get a houseplant by ID
router.get("/:id", async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID format");
        }

        const db = await connectToDatabase();  // Ensure connection is active
        const collection = db.collection("houseplants");
        const result = await collection.findOne({ _id: new ObjectId(req.params.id) });

        if (!result) {
            res.status(404).send("Not found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.error("Error fetching houseplant by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
