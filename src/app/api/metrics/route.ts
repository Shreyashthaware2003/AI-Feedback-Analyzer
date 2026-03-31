import { verifyToken } from "@/lib/auth";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

// get all the required metrics
export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const user = verifyToken(token) as { userId: string };

        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const userId = user.userId;

        const totalCountResult = await pool.query(
            `SELECT COUNT(*)::int AS total
            FROM feedbacks
            WHERE "user_id"=$1`,
            [userId]);

        const statsResult = await pool.query(
            `SELECT 
                COUNT(*)::int AS total,
                COUNT(*) FILTER (WHERE sentiment = 'Positive')::int AS positive,
                COUNT(*) FILTER (WHERE sentiment = 'Negative')::int AS negative,
                COUNT(*) FILTER (WHERE sentiment = 'Neutral')::int AS neutral,
                COUNT(*) FILTER (WHERE is_edited = true)::int AS edited
             FROM feedbacks
             WHERE "user_id" = $1`,
            [userId]
        );

        const stats = statsResult.rows[0];

        const trendsResult = await pool.query(
            `SELECT 
        DATE("created_at") as date,
        COUNT(*) FILTER (WHERE sentiment = 'Positive')::int AS positive,
        COUNT(*) FILTER (WHERE sentiment = 'Negative')::int AS negative,
        COUNT(*) FILTER (WHERE sentiment = 'Neutral')::int AS neutral
     FROM feedbacks
     WHERE "user_id" = $1
      AND "created_at" >= NOW() - INTERVAL '7 days'
     GROUP BY DATE("created_at")
     ORDER BY date ASC`,
            [userId]
        );

        const trends = trendsResult.rows;

        const last7Days = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);

            const dateStr = d.toISOString().split("T")[0];

            const found = trends.find((t: any) => {
                const dbDate = new Date(t.date).toISOString().split("T")[0];
                return dbDate === dateStr;
            });

            last7Days.push({
                date: dateStr,
                positive: found?.positive || 0,
                negative: found?.negative || 0,
                neutral: found?.neutral || 0,
            });
        }

        return NextResponse.json({
            success: true,
            stats,
            trend: last7Days
        })

    } catch (error) {
        console.error("METRICS feedback error:", error);
        return NextResponse.json(
            { message: "Failed to fetch metrics" },
            { status: 500 }
        );

    }
}
