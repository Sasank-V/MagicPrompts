import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const GET = async (request, {params}) => {
    try{
        await connectToDB();
        // console.log("ID :",params.id);
        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");
        // console.log(prompts);
        return new Response(JSON.stringify(prompts),{status :201});
    }catch(error){
        console.log(error);
        return new Response("Failed to fetch all prompts",{status: 500});
    }
}