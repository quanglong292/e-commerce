import mongoose from "mongoose";

// Relation
import { HISTORY_TYPE } from "@/utils/constant";

// Relations

export const HistorySchema = new mongoose.Schema({
    id: String,
    userId: {
        type: String,
        required: true,
    },
    type: typeof HISTORY_TYPE,
    date: Date,
    description: String,
})

export default mongoose.model('History', HistorySchema);