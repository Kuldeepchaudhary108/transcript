import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processTranscript = async (req, res) => {
  const { transcript } = req.body;

  if (!transcript.trim()) {
    return {
      clean_transcript: "",
      summary: ["No summary available."],
      action_items: ["No action items found."],
    };
  }

  const prompt = `
  You are an AI assistant that processes meeting transcripts.
  Input transcript:
  ${transcript}

  Tasks:
  1. Remove filler words (um, uh, like, you know, etc.) and return the clean transcript.
  2. Provide a concise summary in 3-5 bullet points.
  3. Extract action items (tasks/responsibilities). 
     If no action items exist, respond with "No action items found."

  Return output in JSON format with keys:
  - clean_transcript
  - summary (list of bullet points)
  - action_items (list of tasks)
  `;
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4", // Use gpt-4 (or gpt-3.5-turbo if you want a smaller model)
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    // Parse the response
    const parsedResponse = JSON.parse(response.choices[0].message.content);

    // Send the parsed response back
    return res.status(200).json(parsedResponse);
  } catch (err) {
    return {
      clean_transcript: response.choices[0].message.content,
      summary: ["Parsing error – please refine model output."],
      action_items: ["Parsing error – please refine model output."],
    };
  }
};
export { processTranscript };
