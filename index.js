const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
  prompt: prompt,
  temperature: 0,
  max_tokens: 600,
  });
  res.send(completion.data.choices[0].text);
});

// Start the server
const port = 6060;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});