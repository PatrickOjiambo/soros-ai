import { NextRequest, NextResponse } from "next/server";
import { Strategy, strategySchema } from "@/types/strategy";
import { strategyRepository } from "@/db/repositories";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsed = strategySchema.safeParse(body);
        if(!parsed.success) {
            return NextResponse.json(
                { error: "Invalid request body", details: parsed.error },
                { status: 400 }
            );
        }
        const strategy: Strategy = parsed.data;
        const createdStrategy = await strategyRepository.createStrategy(strategy);
        
        return NextResponse.json(
            { 
                message: "Strategy created successfully",
                data: createdStrategy 
            }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Error while creating strategy:", error);
        
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