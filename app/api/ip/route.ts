import { NextResponse, NextRequest } from "next/server";
export async function GET(req: NextRequest) {
    try{
        const ip =
        req.headers.get("x-forwarded-for") || "Unknown IP";
        return NextResponse.json({ip})
        
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    catch (error){
        return NextResponse.json({error: "Failed to retrieve IP address"}, {status: 500})
    }
}