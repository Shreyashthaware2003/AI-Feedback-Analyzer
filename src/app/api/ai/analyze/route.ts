import { NextResponse } from "next/server";

async function callGemini(model: string, content: string) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `Classify the following feedback: ${content}` }]
            }],
            generation_config: {
                temperature: 0.1,
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

    if (data.error) throw data.error;

    return data.candidates?.[0]?.content?.parts?.[0]?.text;
}

async function retry(fn: () => Promise<any>, retries = 2) {
    for (let i = 0; i <= retries; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === retries) throw err;
            await new Promise(res => setTimeout(res, 1000));
        }
    }
}

export async function POST(req: Request) {
    try {
        const { content } = await req.json();

        let rawText;

        try {
            rawText = await retry(() => callGemini("gemini-2.5-flash", content));
        } catch (err) {
            console.log("Primary failed, switching model...");
            rawText = await retry(() => callGemini("gemini-1.5-flash", content));
        }

        if (!rawText) {
            throw new Error("Empty response");
        }

        return NextResponse.json(JSON.parse(rawText));

    } catch (error: any) {
        console.error("AI ROUTE ERROR:", error);

        return NextResponse.json({
            sentiment: "Neutral",
            summary: "Could not analyze at the moment"
        });
    }
}