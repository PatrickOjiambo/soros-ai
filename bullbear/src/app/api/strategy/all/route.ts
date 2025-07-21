import { NextRequest, NextResponse } from "next/server";
import { strategyRepository } from "@/db/repositories";
export default async function GET(request: NextRequest) {
    try {
        const strategies = await strategyRepository.getAllStrategies();
        return NextResponse.json(
            {
                message: "Strategies retrieved successfully",
                data: strategies
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while retrieving strategies:", error);
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