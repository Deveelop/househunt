import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json(property);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}
