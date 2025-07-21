import { NextRequest, NextResponse } from "next/server";
import { strategyRepository } from "@/db/repositories";
export default async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return NextResponse.json(
                { error: "Strategy ID is required" },
                { status: 400 }
            );
        }
        const strategy = await strategyRepository.getStrategyById(id);
        return NextResponse.json(
            {
                message: "Strategy retrieved successfully",
                data: strategy
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while retrieving strategy:", error);
        if (error instanceof Error && error.message.includes('Invalid')) {
            return NextResponse.json(
                { 
                    error: "Validation failed",
                    details: error.message 
                }, 
                { status: 400 }
            );
        }
        if (error instanceof Error && error.message.includes('duplicate')) {
            return NextResponse.json(
                { error: "Strategy already exists" }, 
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}