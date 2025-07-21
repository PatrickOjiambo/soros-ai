import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const strategySchema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true, index: true }, // Add index for user queries
    description: { type: String, required: true },
    refined_strategy: { type: String, required: true },
    ticker: { type: String, required: true, index: true }, // Add index for ticker queries
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    reviews: [{ body: String, user: String, date: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const SignalSchema = new Schema({
    strategyId: { type: Schema.Types.ObjectId, ref: 'Strategy', required: true },
    action: { type: String, required: true },
    opinion: { type: String, required: true },
    reason: { type: String, required: true },
    summary: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const Strategy = mongoose.model('Strategy', strategySchema);
const Signal = mongoose.model('Signal', SignalSchema);

export { Strategy, Signal };