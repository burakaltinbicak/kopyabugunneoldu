import mongoose from 'mongoose';


const SettingsSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true, unique: true
    },
    value: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
