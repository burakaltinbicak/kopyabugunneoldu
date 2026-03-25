import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Homepage from "@/models/Category";

export async function GET() {
    try {
        await connectDB();
        const categories = await Homepage.find(
            { status: "active" })
            .select("name slug")
            .sort({ order: 1 });
        return NextResponse.json(categories);
    }
    catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 });
    }
}
