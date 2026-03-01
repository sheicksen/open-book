import { generateContent } from "./gemini";

export async function generateNewsLinks(topic) {
    let prompt = "Return valid news article links around the topic of " + topic + " with a brief description of what they are about;";
    return await generateContent(prompt, z.object({
        link: z.string().describe("A news article link related to the topic"),
        description: z.string().describe("A brief description of the news article content"),
    })).then((response) => {
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    });
}