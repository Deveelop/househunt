import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function POST(req: Request) {
  try {
   
   
    

    const { userName, userEmail, userContact, propertyId, ipAddress } = await req.json();

  
    const existingRequest = await prisma.secureRequest.findFirst({
      where: {
        propertyId,
        ipAddress,
        status: "Pending",
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: "You have already made a request for this property. Wait for admin approval." },
        { status: 400 }
      );
    }

   
    const newRequest = await prisma.secureRequest.create({
      data: {
        userName,
        userEmail,
        userContact: parseFloat(userContact),
        propertyId,
        ipAddress,
        status: "Pending",
      },
    });

    return NextResponse.json(
      { message: "Secure request submitted successfully", request: newRequest },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
