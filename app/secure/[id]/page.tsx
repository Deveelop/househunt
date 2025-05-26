"use client";
import { FaArrowAltCircleRight} from "react-icons/fa"
import { useState, useEffect } from "react";
import {  useParams } from "next/navigation";


interface Property {
  id: string;
  houseType: string;
  address: string;
  stateNig: string;
  description: string;
  contact: string;
}

export default function SecureApartment() {
  const [property, setProperty] = useState<Property | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isError, setError] = useState<string | null>(null)

  ;
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

    async function fetchIpAddress() {
      try {
        const res = await fetch("/api/ip");
        const data = await res.json();
        console.log(data)
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Failed to fetch IP address", error);
      }
    }

    fetchProperty();
    fetchIpAddress();
  }, [propertyId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!property) return;

    const requestData = {
      userName,
      userEmail,
      userContact,
      propertyId: property.id,
      ipAddress,
      status: "Pending",
    };

    try {
      const res = await fetch("/api/secure-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      setSubmitted(true);
      setError(null)
    } catch (error) {
      if(error instanceof Error) {
        setError(error.message)
      } else{
       setError("An unknown error occured. Please try again!")
      }
    
    }
  }

  if (!property) return <p>Loading property details...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" p-10 bg-white rounded-2xl shadow-lg mt-4 mb-4 max-w-lg w-full">
        
        <h2 className="text-xl font-semibold text-gray-800">
          <span className="text-red-600 font-bold">Please Note:
            </span>
            <ul>
              <li className=" flex items-center gap-2"><FaArrowAltCircleRight className=" text-red-600"/>Houseek does not have House Agent.</li>
              <li className=" flex items-center gap-2"><FaArrowAltCircleRight className=" text-red-600"/>Houseek will never ask you for money.</li>
              <li className=" flex items-center gap-2"><FaArrowAltCircleRight className=" text-red-600"/>Do not pay any inspection / percentage fee.</li>
              <li className=" text-red-600 italic"> Ask existing neighboors living 
              around to be sure of who you are making payment to.</li>
            </ul>
        </h2>
        <h1 className=" text-xl text-center font-bold">Secure {property.houseType}</h1>
        <p className=" text-center">
        <strong>Address:</strong> {property.description} {property.address}, {property.stateNig}
      </p>
      <p className=" text-red-600 font-bold">{isError}</p>
      {!submitted ? (<form onSubmit={handleSubmit} className="mt-5">
          <div>
            <label className="block font-medium text-gray-700">Full Name*</label>
            <input type="text"  value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required placeholder="Type Name" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"/>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Email*</label>
            <input type="email"  value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required placeholder="Enter Email" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"/>
          </div>
          <div>
            <label className="block font-medium text-gray-700">Phone Number*</label>
            <input type="tel"  value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              required placeholder="Your Phone Number" className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none"/>
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
          >
            Submit Request
          </button>
        </form>
        ) : (
          <div className="confirmation">
            <h3 className="text-green-600">Request Submitted!</h3>
            <p>Contact the property owner directly:</p>
            <p>
              <strong>Phone:</strong> {property.contact}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
