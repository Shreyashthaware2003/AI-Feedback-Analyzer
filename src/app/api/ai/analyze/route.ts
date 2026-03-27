import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        // 1. Use v1beta (for the latest models) and gemini-2.5-flash
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Classify the following feedback: ${content}` }]
                }],
                generation_config: { // <--- Must be snake_case
                    temperature: 0.1,
                    // CRITICAL: REST API keys must be snake_case
                    response_mime_type: "application/json", 
                    response_schema: {
                        type: "object",
                        properties: {
                            sentiment: { type: "string", enum: ["Positive", "Negative", "Neutral"] },
                            summary: { type: "string" }
                        },
                        required: ["sentiment", "summary"]
                    }
                },
            }),
        });

        const data = await response.json();

        // If the API returns a 400 or 404, it will be inside this error object
        if (data.error) {
            console.error("GEMINI REJECTION:", JSON.stringify(data.error, null, 2));
            return NextResponse.json({ error: data.error.message }, { status: data.error.code || 400 });
        }

        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!rawText) {
            throw new Error("Empty response: Check safety filters or prompt content.");
        }

        return NextResponse.json(JSON.parse(rawText));

    } catch (error: any) {
        console.error("AI ROUTE ERROR:", error);
        return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
    }
}