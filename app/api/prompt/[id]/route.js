import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

//GET ( read)
export const GET = async (request,{params}) => {
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if(!prompt){
            return new Response("Prompt not found",{status:404});
        }
        return new Response(JSON.stringify(prompt),{status :201 });
    }catch(error){
        console.log("Error while fetching prompt: " , error);
        return new Response("Failed to fetch a prompt",{status: 500});
    }
}

//PATCH (edit)
export const PATCH = async (request,{params}) => {
    const {prompt,tag} = await request.json();
    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response("Prompt not found",{status: 404});
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:200});
    }catch(error){
        console.log("Error while editing: " ,error);
        return new Response("Failed to Edit prompt",{status: 500})
    }
}

//DELETE (delete)
export const DELETE = async (request,{params}) => {
    try{
        await  connectToDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt deleted successfully",{status:200});
    }catch(error){
        console.log("Error while Deleting: ",error);
        return new Response("Failed to delete Prompt",{status:500});
    }
}