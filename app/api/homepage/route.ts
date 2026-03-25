import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import News from "@/models/News";

export async function GET() {
    try {
        await connectDB();
        const featured = await News.findOne({ status: "published" })
            .sort({ createdAt: -1 })
            .select("title slug summary coverimage publishedAt")
            .populate("category", "name slug");

        const latest = await News.find({ status: "published" })
            .sort({ createdAt: -1 })
            .select("title slug ")


        return NextResponse.json({ featured, latest });
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch homepage data" }, { status: 500 });
    }
}