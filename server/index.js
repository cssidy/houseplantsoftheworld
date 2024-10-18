import express from "express";
import cors from "cors";
import compression from 'compression';
import records from "./routes/api.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(compression())
app.use(express.json());

app.use("/api", records);

app.get('*', (req, res) => {
    res.status(200).send('Server is on');
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});