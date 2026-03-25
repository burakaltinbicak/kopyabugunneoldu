import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
    status: { type: String, enum: ["active", "passive"], default: "active" }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");