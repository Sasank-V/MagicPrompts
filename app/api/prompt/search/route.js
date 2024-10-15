import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";
import User from "@models/user";

export const GET = async (request) => {
    try{
        await connectToDB();
        const {searchParams} = new URL(request.url);
        const searchText = searchParams.get('searchText');
        
        if(!searchText){
            const prompts = await Prompt.find({}).populate("creator");
            return new Response(JSON.stringify(prompts),{status :201});
        }
        
        const regex = new RegExp(searchText,'i');
        const prompts = await Prompt.find({
            $or: [
                { tag: { $regex: regex } },
                // Here we search for the populated 'creator.username' field
                { creator: { $in: await User.find({ username: { $regex: regex } }).select('_id') } },
                {prompt: {$regex: regex}}
            ]
        }).populate("creator");
        return new Response(JSON.stringify(prompts),{status :201});
    }catch(error){
        console.log(error);
        return new Response("Failed to fetch prompts",{status: 500});
    }
}