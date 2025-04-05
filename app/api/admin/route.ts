import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.secureRequest.findMany({
      include: { property: true }, 
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching secure requests:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { requestId, action } = await req.json(); 

    if (!["Accepted", "Rejected"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    
    const updatedRequest = await prisma.secureRequest.update({
      where: { id: requestId },
      data: { status: action },
    });

   
    if (action === "Accepted") {
      await prisma.property.update({
        where: { id: updatedRequest.propertyId },
        data: { status: "Secured" },
      });
    }

    return NextResponse.json({ message: `Request ${action}` });
  } catch (error) {
    console.error("Error updating secure request:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
