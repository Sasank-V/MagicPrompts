import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const POST = async (req,res) => {
    const {userId,prompt,tag} = await req.json();
    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201});
    } catch (error) {
        return new Response("Falied to create a new Prompt",{status:500});
    }
}