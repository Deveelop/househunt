import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const requests = await prisma.secureRequest.findMany({
      include: { property: true }, // Include property details
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching secure requests:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { requestId, action } = await req.json(); // `action` will be "Accepted" or "Rejected"

    if (!["Accepted", "Rejected"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // Update secure request status
    const updatedRequest = await prisma.secureRequest.update({
      where: { id: requestId },
      data: { status: action },
    });

    // If approved, mark property as "Secured"
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
