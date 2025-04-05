import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const price = formData.get("price") as string;
    const stateNig = formData.get("stateNig") as string;
    const address = formData.get("address") as string;
    const houseType = formData.get("houseType") as string;
    const contact = formData.get("contact") as string;
    const description = formData.get("description") as string;

    if (!file || !price || !stateNig || !address || !houseType || !contact || !description) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

   
    return new Promise((resolve) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "housesdb" },
        async (error, result) => {
          if (error) {
            resolve(
              NextResponse.json(
                { error: "Upload failed", details: error.message },
                { status: 500 }
              )
            );
            return;
          }

          
          const property = await prisma.property.create({
            data: {
              houseType,
              stateNig,
              address,
              description,
              price: parseFloat(price),
              contact: parseFloat(contact),
              imageUrl: result?.secure_url || "",
            },
          });

          resolve(
            NextResponse.json({ message: "Property uploaded successfully", property }, { status: 201 })
          );
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
