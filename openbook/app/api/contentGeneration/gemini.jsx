
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({apiKey: "AIzaSyDft3gzkrvqnNC2jmosTEWeNTV4fbZVpPc"})

async function generateContent(prompt, format) {
  // console.log("format received:", format);
  // console.log("format type:", typeof format);
  // console.log("is zod schema:", format?._def);

  console.log(typeof format);
  console.log(z.toJSONSchema(format));
  try {
    const result = z.toJSONSchema(format); // test it here before the API call
    // console.log("toJSONSchema result:", result);
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(format)
    }
  });
   return response.text;
}
catch (error) {  console.error("Error generating content:", error);
  return "An error occurred while generating content.";
}
}
async function generateVideoLinks(topic) {
  let prompt = "Return valid youtube video links for people who are new to " + topic + " with a brief description of what they are for;";
    await generateContent(prompt, z.object({
    title: z.string().describe("A short title related to the video"),
    video: z.string().describe("A video link related to the topic for the post."),
    body: z.string().describe("A brief description of the video content for the post."),
  })).then((response) => {
    if (response == "An error occurred while generating content."){
      return "";
    }
    const parsedResponse = JSON.parse(response);
  });
}
async function generateArticle(topic) {
  let prompt = "Generate articles about " + topic + " for a beginner audience with titles";
  await generateContent(prompt, z.object({
    title: z.string().describe("The title of the article for the post."),
    body: z.string().describe("The content of the article for post."),
  })).then((response) => {
    const parsedResponse = JSON.parse(response);
    return parsedResponse;
  });
}
async function generateTutorial(topic) {
  let prompt = "Generate a step by step self contained tutorial about " + topic + " for a beginner audience with titles";
  const response = await generateContent(prompt, z.object({
    title: z.string().describe("The title of the tutorial for the post."),
    body: z.string().describe("The brief steps of the tutorial."),
  }))
  console.log("MY RESPONSE", response);
  return response.text;
}
 async function generatePosts(topic, numPosts){
   let posts = []
   for (let i = 0; i < numPosts; i++){
      let post =  await generateArticle(topic);
      if (post == ""){
        return "";
      }
      post = post[0];
      post = {...post, tag: "Post", authorId: "cmm7e61y10001nwv61mvg95d9", Image:"", id:i}
      posts.push(post);
    }
    return posts;
}

export async function POST(req){
  try{
    const {theme, number} = await req.JSON()

    if (number < 0 ||  number > 5 && theme.length < 3){
      return (NextResponse(
        {message: "Illegal number of prompts requested", num:number},
        {status:  400}
      ));
    }
    
    const post = await generateTutorial(theme);
    if (post){
          try {
            const res = await fetch("/api/createpost", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: post.title.trim(),
                body:  post.body.trim(),
                tag:   "Post",
                image: null,
                community: theme
              }),
            });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong.");
        return;
      }
     }catch (err){
          console.error("[gemini]", err);
      return NextResponse.json({ error: "Server error." }, { status: 500 });
      }
    }
  }catch (err) {
    console.error("[gemini]", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}