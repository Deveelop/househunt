'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Property {
  id: string;
  houseType: string;
  price: number;
  stateNig: string;
  address: string;
  description: string;
  contact: number
  imageUrl: string;
}

export default function AvailableProperties() {
 const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        if (!res.ok) throw new Error("Failed to fetch properties");
        
        const data = await res.json();
        setProperties(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading properties...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Houses</h1>
      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {properties.map((house) => (
            <div onClick={() => router.push(`/property/${house.id}`)} key={house.id} className="border p-4 rounded-lg shadow cursor-pointer">
              <img
                src={house.imageUrl}
                alt={house.houseType}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{house.houseType}</h2>
              <p className="text-gray-700">{house.description}, {house.address} {house.stateNig}.  </p>
              <div className=" text-center">
              <p className="text-lg font-bold text-blue-600">₦{house.price.toLocaleString()}</p>
            
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
