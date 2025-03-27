"use client";

import { useEffect, useState } from "react";

interface SecureRequest {
  id: string;
  userName: string;
  userEmail: string;
  userContact: string;
  property: { houseType: string; address: string; stateNig: string };
  status: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<SecureRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("/api/admin");
        if (!res.ok) throw new Error("Failed to fetch requests");

        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  async function handleAction(requestId: string, action: "Accepted" | "Rejected") {
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });

      if (!res.ok) throw new Error("Failed to update request");

      setRequests((prevRequests) =>
        prevRequests.map((r) =>
          r.id === requestId ? { ...r, status: action } : r
        )
      );
    } catch (error) {
      console.error(`Error updating request:`, error);
    }
  }

  if (loading) return <p>Loading secure requests...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard - Secure Requests</h1>
      {requests.length === 0 ? (
        <p>No secure requests yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">User</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Property</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border">
                <td className="border p-2">{request.userName}</td>
                <td className="border p-2">{request.userEmail}</td>
                <td className="border p-2">{request.userContact}</td>
                <td className="border p-2">{request.property.houseType} - {request.property.address}, {request.property.stateNig}</td>
                <td className="border p-2">{request.status}</td>
                <td className="border p-2">
                  {request.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-500 text-white px-2 py-1 mr-2"
                        onClick={() => handleAction(request.id, "Accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1"
                        onClick={() => handleAction(request.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
