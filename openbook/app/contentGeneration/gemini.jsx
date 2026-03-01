
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({apiKey: "AIzaSyBXnuoX7IFJDGcabkL6iDjBjc8cUa3Na34"})

async function generateContent(prompt, format) {
  console.log("format received:", format);
  console.log("format type:", typeof format);
  console.log("is zod schema:", format?._def);

  console.log(typeof format);
  console.log(z.toJSONSchema(format));
  try {
    const result = z.toJSONSchema(format); // test it here before the API call
    console.log("toJSONSchema result:", result);
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(format)
    }
  });
   console.log(response.text);  
   return response.text;
}
catch (error) {  console.error("Error generating content:", error);
  return "An error occurred while generating content.";
}
}
export async function generateVideoLinks(topic) {
  let prompt = "Return valid youtube video links for people who are new to " + topic + " with a brief description of what they are for;";
    await generateContent(prompt, z.object({
    video1: z.string().describe("A video link related to the topic for post number 1"),
    description1: z.string().describe("A brief description of the video content for pot number 1"),
  })).then((response) => {
    console.log("reached me");
    const parsedResponse = JSON.parse(response);
    console.log("parsed response:", parsedResponse);
    return parsedResponse;
  });
}
export async function generateArticle(topic) {
  let prompt = "Generate articles about " + topic + " for a beginner audience with titles";
  await generateContent(prompt, z.object({
    title1: z.string().describe("The title of the article for post number 1"),
    article1: z.string().describe("The content of the article for post number 1"),
  })).then((response) => {
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
    console.log(parsedResponse);
  });
}
export async function generateTutorial(topic) {
  let prompt = "Generate a step by step self contained tutorial about " + topic + " for a beginner audience with titles";
  await generateContent(prompt, z.object({
    title1: z.string().describe("The title of the tutorial for post number 1"),
    step1: z.string().describe("The content of the first step of the tutorial for post number 1"),
  })).then((response) => {
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
    console.log(parsedResponse);
  });
}