require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function createCompletion(model="text-davinci-003", prompt="", max_tokens=10, temperature=0) {
  const response = await openai.createCompletion({
    model: model,
    prompt: prompt,
    max_tokens: max_tokens,
    temperature: temperature,
  });

  return response.data.choices[0].text;
}

const response = createCompletion("text-davinci-003", "Say this is a test", 7, 0)
  .then((response) => {
    console.log(response);
  });
