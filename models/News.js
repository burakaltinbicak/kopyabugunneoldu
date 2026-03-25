import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    publishedAt: { type: Date, default: Date.now },
    coverimage: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" }
}, { timestamps: true });


export default mongoose.models.News || mongoose.model("News", NewsSchema, "News");