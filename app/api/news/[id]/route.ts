import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import News from "@/models/News";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const news = await News.findOne({ slug: params.id, status: "published" })
            .select("title slug summary content category coverimage publishedAt")
            .populate("category", "name slug");
        if (!news) {
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }
        return NextResponse.json(news);
    }
    catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}