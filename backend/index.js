import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { processTranscript } from "./controller/Transcript";

dotenv.config(); // loads .env file

// Create client (API key comes from env automatically)

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.post("/transcript", processTranscript);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
