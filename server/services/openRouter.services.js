import axios from "axios";


export  const askAi = async (messages) =>{
    try{
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            throw new Error("Invalid message input");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
            model: "openai/gpt-4o-mini",
            messages: messages
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json'
            },
        });
        const content = response?.data?.choices?.[0]?.message?.content;
        if(!content || !content.trim()){
            throw new Error("Invalid response from AI");

        }
        return content;

    }catch(error){
        console.error("openrRouter error:", error?.response?.data || error?.messages || error);
        throw new Error("Error occurred while fetching AI response");
    }
}

