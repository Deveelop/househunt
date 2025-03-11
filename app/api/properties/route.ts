import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const properties = await prisma.property.findMany();

    // Ensure properties is always an array
    if (!properties) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(properties, { status: 200 });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
