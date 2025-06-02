"use client"; 
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import StatesApi from "@/apiCalls/StatesApi";
interface Property {
  id: string;
  houseType: string;
  price: number;
  stateNig: string;
  address: string;
  description: string;
  contact: string
  imageUrl: string;
  lgas: string
}


export default function Home() {
  const router = useRouter();
  const {fetchStates, fetchLgas, states, lgas, formData,loadingLgas, setFormData, isError} = StatesApi()
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchStates();
  }, []);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!formData.stateNig) return;
    fetchLgas();
  }, [formData.stateNig]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }
    fetchProperties();
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        filterProperties(query);
      }, 500)
    );
  };

  const handleSearchClick = () => {
    filterProperties(searchQuery);
  };

  const filterProperties = (query: string) => {
    if (!query) {
      setFilteredProperties([]);
      return;
    }
  
    const filtered = properties.filter((property) =>
      [
        property.houseType,
        property.stateNig,
        property.lgas,
        property.address,
        property.description,
        property.contact
      ]
      .filter(field => field) 
      .some(field => String(field).toLowerCase().includes(query))
    );
  
    setFilteredProperties(filtered);
  };
  
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
        description: "",
        houseType: "",
        contact: "",
      });
      setImage(null);
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("An unknown error occurred");
  }
} finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full bg-cover bg-center bg-no-repeat px-5 py-12 md:px-12 lg:px-16 max-w-7xl lg:py-24"
      style={{ backgroundImage: "url(/wallpaper.jpg)" }}>
      
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative flex flex-col items-center text-center text-white space-y-8">
       
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl md:text-5xl font-bold">Find Your Dream Apartment</h1>
          <p className="mt-3 text-gray-300">Search available apartments with ease.</p>
          <form className="mt-5 flex gap-2 justify-center">
            <input 
              type="text" 
              placeholder="Search by house type or location" 
              className="w-full max-w-md p-3 rounded-lg border shadow-md text-black" 
              value={searchQuery} 
              onChange={handleSearchInput}
            />
            <button  type="button"   onClick={handleSearchClick} className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white">Search</button>
          </form>
        </div>

        <div className="max-w-4xl w-full bg-white p-6 shadow-lg rounded-lg text-black">
        <h2 className="text-xl font-semibold mb-4">Available Apartments</h2>
        <div >
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProperties.map((property) => (
                <div  onClick={() => router.push(`/property/${property.id}`)} key={property.id} className="border p-4 rounded-lg shadow cursor-pointer">
                  <img
                src={property.imageUrl}
                alt={property.houseType}
                className="w-full h-40 object-cover rounded"
              />
              <div className=" mx-0">
              <h2 className="text-xl font-semibold mt-2">{property.houseType}</h2>
              <p className="text-gray-700">{property.description}, {property.address} {property.stateNig}</p>
              <p className="text-lg font-bold text-blue-600">₦{property.price.toLocaleString()}</p>
                  </div>
                  </div>
              ))}
            </div>
          ) : (
            <p>No matching apartments found.</p>
          )}
          </div>
        </div>

      
        <h1 className="text-3xl md:text-5xl font-bold">Upload Available Apartment</h1>
        <p className="mt-3 text-gray-300">Make someone&apos;s search easy today by uploading available apartment</p>
        <div className="items-center justify-center gap-10 mt-12 p-6 bg-white shadow-lg rounded-lg mx-auto">
        <form onSubmit={handleSubmit} className="">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          <div className=" grid md:grid-cols-3  gap-4 w-full text-black">
          <select name="houseType" value={formData.houseType} onChange={handleInputChange} className="border p-2 w-full" required>
        <option value="">Select House Type</option>
        <option value="Single Room">Single Room</option>
        <option value="Self Contained">Self Contained</option>
        <option value="Bedroom and Parlour">Bedroom and Parlour</option>
        <option value="More than One Bedroom and Parlour">More than One Bedroom and Parlour</option>
      </select>
          
      <select name="stateNig" value={formData.stateNig} onChange={handleInputChange} className="border p-2 mt-2 w-full" required>
        <option value="">{isError ? isError : 'Select State'}</option>
        
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select name="address" value={formData.address} onChange={handleInputChange} className="border p-2 mt-2 w-full" required disabled={loadingLgas || !formData.stateNig}>
        <option value="">Select LGA</option>
        {lgas.map((lga) => (
          <option key={lga} value={lga}>
            {lga}
          </option>
        ))}
      </select>
            <input type="text" name="description" placeholder="Enter description" value={formData.description} onChange={handleInputChange} className="border p-3 rounded-lg w-full" required />
            <input type="number" name="price" placeholder="Enter price" value={formData.price} onChange={handleInputChange} className="border p-3 rounded-lg w-full" required />
            <input type="file" accept="image/*" onChange={handleFileChange} className="border p-3 rounded-lg w-full" required />
            <input type="tel" name="contact" placeholder="Contact person phone" value={formData.contact} onChange={handleInputChange} className="border p-2 w-full" required />
      
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
