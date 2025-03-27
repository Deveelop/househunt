import { NextResponse } from "next/server";
export async function GET(req: Request){
    try{
        const ip =
        req.headers.get("x-forwarded-for") || "Unknown IP";
        return NextResponse.json({ip})
    } catch (error){
        return NextResponse.json({error: "Failed to retrieve IP address"}, {status: 500})
    }
}