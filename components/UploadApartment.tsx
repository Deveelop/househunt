"use client"; 
import { useState} from "react";
import StatesApi from "@/apiCalls/StatesApi";


const UploadApartment = () => {
    const {states, lgas, formData,loadingLgas, setFormData} = StatesApi()
     const [image, setImage] = useState<File | null>(null);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState<string | null>(null);

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
        } catch (error: any) {
          console.error("Upload error:", error);
          setError(error.message || "An error occurred while uploading.");
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
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
         <option value="Single Room">Single Room</option>
         <option value="Self Contained">Self Contained</option>
         <option value="Bedroom and Parlour">Bedroom and Parlour</option>
         <option value="More than One Bedroom and Parlour">More than One Bedroom and Parlour</option>
       </select>
           {/* State Selection */}
       <select name="stateNig" value={formData.stateNig} onChange={handleInputChange} className="border p-2 mt-2 w-full" required>
         <option value="">Select State</option>
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
             <input type="number" name="contact" placeholder="Contact person phone" value={formData.contact} onChange={handleInputChange} className="border p-2 w-full" required />
       
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
  )
}

export default UploadApartment;
