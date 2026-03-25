import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Setting from "@/models/Settings";

export async function GET() {
    try {
        await connectDB();
        const settings = await Setting.find().select("key value ");
        return NextResponse.json(settings);
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}