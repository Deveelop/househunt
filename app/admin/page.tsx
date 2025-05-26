"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SecureRequest {
  id: string;
  userName: string;
  userEmail: string;
  userContact: string;
  property: { houseType: string; address: string; stateNig: string; contact: string };
  status: string;
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<SecureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Log session and status for debugging
    console.log("Session:", session, "Status:", status);

    if (status === "loading") return; // Wait for session to resolve

    if (status === "unauthenticated") {
      router.replace("/admin/login");
      return;
    }

    if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      router.replace("/admin");
      return;
    }

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
  }, [session, status, router]);

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

  if (status === "loading" || loading) {
    return <p className="p-4">Loading secure requests...</p>;
  }

  if (status === "unauthenticated") {
    return <p className="p-4">Redirecting to login...</p>;
  }

  if (session?.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return <p className="p-4">Redirecting to admin page...</p>;
  }

  return (
    <div className="p-4 max-w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4 text-center sm:text-left">
        Admin Dashboard - Secure Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center sm:text-left">No secure requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
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
                <tr key={request.id} className="border hover:bg-gray-50">
                  <td className="border p-2">{request.userName}</td>
                  <td className="border p-2">{request.userEmail}</td>
                  <td className="border p-2">{request.userContact}</td>
                  <td className="border p-2">
                    {request.property.houseType} - {request.property.address},{" "}
                    {request.property.stateNig} - {request.property.contact}
                  </td>
                  <td className="border p-2">{request.status}</td>
                  <td className="border p-2">
                    {request.status === "Pending" && (
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() => handleAction(request.id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleAction(request.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}