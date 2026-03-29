import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { pool } from "@/lib/db";
import { unauthorized } from "next/navigation";


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
            `SELECT id, content, sentiment, summary, "created_at",edited_at, is_edited
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

// edit feedback
export async function PATCH(req: Request) {
    try {

        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const user = verifyToken(token) as { userId: string };

        if (!user) {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const userId = user.userId;

        const body = await req.json();
        const { feedbackId, content, sentiment, summary } = body;

        if (!feedbackId) {
            return NextResponse.json(
                { error: "Feedback ID is required" },
                { status: 400 }
            );
        }

        if (!content && !sentiment && !summary) {
            return NextResponse.json(
                { error: "No fields to update" },
                { status: 400 }
            );
        }

        const fields: string[] = [];
        const values: any[] = [];
        let index = 1;

        let isUpdating = false;

        if (content !== undefined) {
            fields.push(`content = $${index++}`);
            values.push(content);
            isUpdating = true;
        }

        if (sentiment !== undefined) {
            fields.push(`sentiment = $${index++}`);
            values.push(sentiment);
            isUpdating = true;
        }

        if (summary !== undefined) {
            fields.push(`summary = $${index++}`);
            values.push(summary);
            isUpdating = true;
        }

        if (isUpdating) {
            fields.push(`is_edited = TRUE`);
            fields.push(`edited_at = NOW()`);
        }

        values.push(feedbackId);
        values.push(userId);

        const query = `
            UPDATE feedbacks
            SET ${fields.join(", ")}
            WHERE id = $${index++} AND "user_id" = $${index}
            RETURNING *
        `;

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return NextResponse.json(
                { error: "Feedback not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Feedback updated successfully",
            data: result.rows[0],
        });

    } catch (error) {
        console.error("PATCH feedback error:", error);

        return NextResponse.json(
            { error: "Failed to update feedback" },
            { status: 500 }
        );
    }
}


// delete feedback

export async function DELETE(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const user = verifyToken(token) as { userId: string };

        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();
        const { feedbackId } = body;

        if (!feedbackId) {
            return NextResponse.json(
                { message: "Feedback ID is required" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `DELETE FROM feedbacks
       WHERE id = $1 AND "user_id" = $2
       RETURNING id`,
            [feedbackId, user.userId]
        );

        if (result.rowCount === 0) {
            return NextResponse.json(
                { message: "Feedback not found or already deleted" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Feedback deleted successfully",
            deletedId: result.rows[0].id,
        });

    } catch (error) {
        console.error("DELETE feedback error:", error);

        return NextResponse.json(
            { message: "Failed to delete feedback" },
            { status: 500 }
        );
    }
}