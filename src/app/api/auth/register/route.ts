import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password required" },
                { status: 400 }
            );
        }

        // 🔐 hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🆔 generate UUID
        const userId = uuidv4();

        const result = await pool.query(
            `INSERT INTO users (id, name, email, password)
             VALUES ($1, $2, $3, $4)
             RETURNING id, name, email`,
            [userId, name || null, email, hashedPassword]
        );

        return NextResponse.json(
            {
                success: true,
                data: result.rows[0],
                message: "User created successfully",
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("USER ERROR:", error);

        if (error.code === "23505") {
            return NextResponse.json(
                { success: false, message: "User already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Failed to create user" },
            { status: 500 }
        );
    }
}