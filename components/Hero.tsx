"use client"; 
import { useState, useEffect } from "react";

export default function Home() {
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    price: "",
    stateNig: "",
    address: "",
    houseType: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch states
  useEffect(() => {
    const fetchStates = async () => {
      console.log("Fetching states...");

      try {
        const response = await fetch("https://naija-places.toneflix.com.ng/api/v1/states", {
          headers: { "X-Api-Key": "qqbJbHtTWuRBf9ib8rNs2LTLhjAC2gY2" },
        });

        console.log("State API Response:", response);

        if (!response.ok) throw new Error(`Error fetching states: ${response.statusText}`);

        const rawData = await response.json();
    console.log("State Data:", rawData);

  
    const data = rawData as { data: { name: string }[] };

    
    setStates(data.data.map((item) => item.name));

         console.log(states)
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch LGAs when a state is selected
  useEffect(() => {
    if (!formData.stateNig) return;

    const fetchLgas = async () => {
      console.log(`Fetching LGAs for state: ${formData.stateNig}...`);
      setLoadingLgas(true);

      try {
        const response = await fetch(`https://naija-places.toneflix.com.ng/api/v1/states/${formData.stateNig}/lgas`, {
          headers: { "X-Api-Key": "qqbJbHtTWuRBf9ib8rNs2LTLhjAC2gY2" },
        });

        console.log("LGA API Response:", response);

        if (!response.ok) throw new Error(`Error fetching LGAs: ${response.statusText}`);

        const rawData = await response.json();
    console.log("State LGA:", rawData);

  
    const data = rawData as { data: { name: string }[] };

    
    setLgas(data.data.map((item) => item.name));
      } catch (error) {
        console.error("Error fetching LGAs:", error);
      } finally {
        setLoadingLgas(false);
      }
    };

    fetchLgas();
  }, [formData.stateNig]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!image) {
      setError("Please upload an image");
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    const form = new FormData();
    form.append("image", image);
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to upload house");
      }
  
      const data = await res.json();
      console.log("Upload success:", data);
  
      setSuccess("House uploaded successfully!");
      setFormData({
        price: "",
        stateNig: "",
        address: "",
        houseType: "",
        contact: "",
      });
      setImage(null);
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-cover bg-center bg-no-repeat px-5 py-12 md:px-12 lg:px-16 max-w-7xl lg:py-24"
      style={{ backgroundImage: "url(/wallpaper.jpg)" }}>
      
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex flex-col items-center text-center text-white space-y-8">
        {/* Search Section */}
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl md:text-5xl font-bold">Find Your Dream Apartment</h1>
          <p className="mt-3 text-gray-300">Search available apartments with ease.</p>
          <form className="mt-5 flex gap-2 justify-center">
            <input type="text" placeholder="Search by location" className="w-full max-w-md p-3 rounded-lg border shadow-md text-black" />
            <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white">Search</button>
          </form>
        </div>

        {/* Upload Form Section */}
        <h1 className="text-3xl md:text-5xl font-bold">Upload Available Apartment</h1>
        <p className="mt-3 text-gray-300">Make someone's search easy today by uploading available apartment</p>
        <div className="items-center justify-center gap-10 mt-12 p-6 bg-white shadow-lg rounded-lg mx-auto">
        <form onSubmit={handleSubmit} className="">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          <div className=" grid grid-cols-3  gap-4 w-full text-black">
          <select name="houseType" value={formData.houseType} onChange={handleInputChange} className="border p-2 w-full" required>
        <option value="">Select House Type</option>
        <option value="SINGLE_ROOM">Single Room</option>
        <option value="SELF_CONTAINED">Self Contained</option>
        <option value="BEDROOM_AND_PALLOUR">Bedroom and Parlour</option>
        <option value="MORE_THAN_ONE_BEDROOM_AND_PALLOUR">More than One Bedroom and Parlour</option>
      </select>
          {/* State Selection */}
      <select name="stateNig" value={formData.stateNig} onChange={handleInputChange} className="border p-2 mt-2 w-full" required>
        <option value="">{loadingStates ? "Loading states..." : "Select State"}</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select name="address" value={formData.address} onChange={handleInputChange} className="border p-2 mt-2 w-full" required disabled={loadingLgas || !formData.stateNig}>
        <option value="">{loadingLgas ? "Loading LGAs..." : "Select LGA"}</option>
        {lgas.map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} className="border p-3 rounded-lg w-full" required />
            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-3 rounded-lg w-full" required />
            <input type="number" name="contact" placeholder="Contact Person" value={formData.contact} onChange={handleInputChange} className="border p-2 w-full" required />
      
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {image && <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-64 object-cover rounded-lg shadow-md" />}
            <button type="submit" className=" px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white w-full mt-4 disabled:opacity-50" disabled={loading}>
              {loading ? "Uploading..." : "Upload House"}
            </button>
          </div>
         
        </form>
      </div>
      </div>
    </section>
  );
}
