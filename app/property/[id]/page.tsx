"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

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
  const params = useParams(); // ✅ Fetch params correctly
  const propertyId = params?.id as string | undefined; // ✅ Handle possible undefined value

  useEffect(() => {
    if (!propertyId) return; // Prevent fetch if no ID is available

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
      <div className=" flex">
      <img
        src={property.imageUrl}
        alt="Property Image"
        className=""
      />
      <div className=" ml-4">
      <h1 className="text-xl font-bold mb-4 border-b-2">{property.houseType}</h1>
      <p className=" border-b-2">
        <strong>Address: </strong>{property.description}, {property.address} {property.stateNig}.
      </p>
      <div className="hidden sm:block">
      <div className=" border-b-2 p-2 w-80"></div>
      <div className=" border-b-2 p-2 w-72"></div>
      <div className=" border-b-2 p-2 w-64"></div>
      <div className=" border-b-2 p-2 w-60"></div>
      <div className=" border-b-2 p-2 w-56"></div>
      <div className=" border-b-2 p-2 w-52"></div>
      <div className=" border-b-2 p-2 w-48"></div>
      <div className=" border-b-2 p-2 w-44"></div>
      <div className=" border-b-2 p-2 w-40"></div>
      <div className=" border-b-2 p-2 w-36"></div>
      <div className=" border-b-2 p-2 w-32"></div>
      <div className=" border-b-2 p-2 w-28"></div>
      <div className=" border-b-2 p-2 w-24"></div>
      <div className=" border-b-2 p-2 w-20"></div>
      <div className=" border-b-2 p-2 w-16"></div>
      <div className=" border-b-2 p-2 w-14"></div>
      <div className=" border-b-2 p-2 w-12"></div>
      <div className=" border-b-2 p-2 w-11"></div>
      <div className=" border-b-2 p-2 w-10"></div>
     </div>
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
