import { NextRequest, NextResponse } from "next/server";
import { signalRepository } from "@/db/repositories";
export default async function GET(request: NextRequest, params: { params: { address: string } }) {
    try {
        const address = params.params.address;
        if (!address) {
            return NextResponse.json(
                { error: "Address is required" },
                { status: 400 }
            );
        }
        const signals = await signalRepository.getSignalByUserAddress(address);

        return NextResponse.json(
            {
                message: "Signals retrieved successfully",
                data: signals
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error while retrieving signals:", error);
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