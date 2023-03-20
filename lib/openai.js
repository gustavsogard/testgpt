require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createCompletion(prompt) {
  prompt = 'Read the following text and create a question for a quiz with four possible answers of which only one is correct. Output it as JSON like this: "{ "status": "success", "question": "", "answers": [] }". The correct answer shall be the first in the array of answers. If you don\'t understand the following text, isn\'t able to generate questions or if there isn\'t any text, output this JSON "{ "status": "error" }" ' + prompt;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 300,
    temperature: 0,
  });

  return response.data.choices[0].text;
}
