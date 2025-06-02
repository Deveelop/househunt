import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error: unknown) { 
    console.error("Error fetching property:", error);

    // Handle other errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch property", details: errorMessage },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}