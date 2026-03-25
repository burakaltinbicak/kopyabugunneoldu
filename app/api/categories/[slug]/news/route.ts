import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Category from "@/models/Category";
import News from "@/models/News";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }

) {
    try {
        const { slug } = await params;
        await connectDB();
        const category = await Category.findOne({ slug, status: "active" })

            .select("name slug");

        if (!category) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 });
        }
        const news = await News.find({ category: category._id, status: "published" })
            .sort({ publishedAt: -1 })
            .select("title slug summary coverImage publishedAt")
            .populate("category", "name slug");
        return NextResponse.json({ category, news });
    }
    catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch news for the category" },
            { status: 500 }
        );
    }
}
