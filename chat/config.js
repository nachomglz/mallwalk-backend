import { Configuration, OpenAIApi } from "openai";
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

export const OpenAI = new OpenAIApi(configuration);
