import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Setting from "@/models/News";

export async function GET() {
    try {
        await connectDB();
        const news = await Setting.find({ status: "published" })
            .sort({ createdAt: -1 })
            .select("title slug summary content coverImage publishedAt")
            .populate("category", "name slug");
        return NextResponse.json({ news });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}