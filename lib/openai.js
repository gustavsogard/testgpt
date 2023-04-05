require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function createCompletion(prompt) {
  if (prompt.length < 10) {
    return "{ \"status\": \"error\", \"message\": \"Teksten er for kort. Skriv venligst mere.\" }";
  } else if (prompt.length > 1000) {
    return "{ \"status\": \"error\", \"message\": \"Teksten er for lang. Skriv venligst mindre.\" }";
  }

  prompt = 'Læs følgende tekst og lav 3 spørgsmål til en quiz med fire mulige svar til hvert spørgsmål, hvoraf kun det ene svar er rigtigt. Udskriv det som JSON på denne måde: "{ "status": "success", "questions": [ { "question": "", "answers": ["", "", "", ""] }, ... ] }". Det rigtige svar for hvert spørgsmål skal være det første i den listen af svar. Hvis du ikke forstår den følgende tekst, ikke er i stand til at generere spørgsmål, eller hvis der ikke er nogen tekst, udskriv denne JSON "{ "status": "error", "message": "Der skete en fejl hos OpenAI." }". Generer ikke et spørgsmål, hvis intet er leveret. Hold antal tokens under 500. ' + prompt;
  
  let response = "{ \"status\": \"error\", \"message\": \"Der skete en fejl hos OpenAI.\" }";

  try {
    response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 500,
      temperature: 0,
    });
  } catch {
    return response;
  }

  console.log("Creating completion");

  console.log(response.data.choices[0].text);

  return response.data.choices[0].text;
}
