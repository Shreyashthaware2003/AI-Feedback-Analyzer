import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { pool } from "@/lib/db";


// Save Feedback

export async function POST(req: Request) {
    try {
        // 🔐 1. AUTH
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const user: any = verifyToken(token);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const userId = user.userId;

        // 📩 2. BODY
        const { content, sentiment, summary } = await req.json();

        if (!content) {
            return NextResponse.json(
                { error: "Content is required" },
                { status: 400 }
            );
        }

        // 💾 3. SAVE TO DB
        const result = await pool.query(
            `INSERT INTO feedbacks (user_id, content, sentiment, summary)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [userId, content, sentiment || null, summary || null]
        );

        return NextResponse.json({
            message: "Feedback saved successfully",
            data: result.rows[0],
        });

    } catch (error) {
        console.error("FEEDBACK SAVE ERROR:", error);

        return NextResponse.json(
            { error: "Failed to save feedback" },
            { status: 500 }
        );
    }
}

// Get feedback

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const user = verifyToken(token) as { userId: string };

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }


        const userId = user?.userId;

        console.log("USER =====>", user);

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const result = await pool.query(
            `SELECT id, content, sentiment, summary, "created_at"
       FROM feedbacks
       WHERE "user_id" = $1
       ORDER BY "created_at" DESC`,
            [userId]
        );

        return NextResponse.json({
            success: true,
            data: result.rows,
        });

    } catch (error) {
        console.error("GET feedback error:", error);

        return NextResponse.json(
            { message: "Failed to fetch feedback" },
            { status: 500 }
        );
    }
}
