"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
interface Property {
  id: string;
  imageUrl: string;
  houseType: string;
  address: string;
  stateNig: string;
  description: string;
}

export default function PropertyDetails() {
  const [property, setProperty] = useState<Property | null>(null);
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string | undefined; 
  useEffect(() => {
    if (!propertyId) return; 

    async function fetchProperty() {
      try {
        const res = await fetch(`/api/properties/${propertyId}`);
        if (!res.ok) throw new Error("Failed to fetch property details");

        const data = await res.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    }

    fetchProperty();
  }, [propertyId]);

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="p-4">
       <h1 className="text-xl font-bold mb-4"><span className="text-gray-500">Available Houses</span> - Houses Details</h1>
      <div className=" sm:w-1/2">
      <div  className="">
      <Image
        src={property.imageUrl}
        alt="Property Image"
        className=" bg-contain w-full"
       fill
      />
      </div>
      <div className="sm:flex justify-between items-center">
      <p className=" font-bold">{property.houseType}</p>
      <p className="">
        <strong>Address: </strong>{property.description}, {property.address} {property.stateNig}.
      </p>
      </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => router.push(`/secure/${propertyId}`)}
      >
        Secure Apartment
      </button>
    </div>
  );
}
