import z from "zod";
import { id } from "zod/locales";
export const strategySchema = z.object({
    id: z.string().optional(),
    refined_strategy: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    ticker: z.string().toUpperCase(),
    owner: z.string().min(1, "Owner is required"),
})
export const signalSchema = z.object({
    id: z.string().optional(),
    strategyId: z.string().min(1, "Strategy ID is required"),
    action: z.string().min(1, "Action is required"),
    opinion: z.string().min(1, "Opinion is required"),
    reason: z.string().min(1, "Reason is required"),
    summary: z.string().min(1, "Summary is required"),
})
export type Signal = z.infer<typeof signalSchema>;
export type Strategy = z.infer<typeof strategySchema>;