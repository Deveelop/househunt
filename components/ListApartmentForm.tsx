"use client"; // Ensures it's a client component

import { useState } from "react";

export default function UploadHouseForm() {
  const [image, setImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [success, setSuccess] = useState<string | null>(null); // Success state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("location", formData.location);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to upload house");
      }

      setSuccess("House uploaded successfully!");
      setFormData({ title: "", description: "", price: "", location: "" });
      setImage(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        name="title"
        placeholder="House Title"
        value={formData.title}
        onChange={handleInputChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleInputChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleInputChange}
        className="border p-2 w-full"
        required
      />
      <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2 w-full" required />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}













// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// type FormData = {
//   apartmentType: string;
//   location: string;
//   landlordContact: string;
//   additionalNotes?: string;
//   images: FileList;
// };

// export default function ListApartmentForm() {
//   const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>();
//   const [previewImages, setPreviewImages] = useState<string[]>([]);

//   // Handle Image Preview
//   const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
//       setPreviewImages(imagesArray);
//     }
//   };

//   // Submit Handler
//   const onSubmit = (data: FormData) => {
//     console.log("Form Submitted:", data);
//     alert("Apartment listed successfully!");
//     reset();
//     setPreviewImages([]);
//   };

//   return (
// <div className=" items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-16 max-w-7xl lg:py-24">
//       <div className="flex w-full mx-auto text-left">
//         <div className=" inline-flex items-center mx-auto align-middle">
//           <div className="text-center">
//             <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
//               Help Make Someone's Search Easy <br className="hidden lg:block"/>
//               By Listing Apartment Closest To You!
//             </h1>
//             <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500"> Know of an empty room in your compound? Upload details and help someone find a home!</p>
            
//           </div>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Apartment Type */}
//         <div>
//           <label className="block text-sm font-medium">Apartment Type</label>
//           <select 
//             {...register("apartmentType", { required: "Apartment type is required" })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select type</option>
//             <option value="Single Room">Single Room</option>
//             <option value="Self-Contained">Self-Contained</option>
//             <option value="1 Bedroom">1 Bedroom</option>
//             <option value="2 Bedroom">2 Bedroom</option>
//           </select>
//           {errors.apartmentType && <p className="text-red-500 text-sm">{errors.apartmentType.message}</p>}
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-sm font-medium">Location</label>
//           <input 
//             type="text" 
//             {...register("location", { required: "Location is required" })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             placeholder="Street, Area, City"
//           />
//           {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//         </div>

//         {/* Landlord Contact */}
//         <div>
//           <label className="block text-sm font-medium">Landlord Contact</label>
//           <input 
//             type="text" 
//             {...register("landlordContact", { required: "Landlord contact is required" })}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             placeholder="Phone number"
//           />
//           {errors.landlordContact && <p className="text-red-500 text-sm">{errors.landlordContact.message}</p>}
//         </div>

//         {/* Additional Notes */}
//         <div>
//           <label className="block text-sm font-medium">Additional Notes (Optional)</label>
//           <textarea 
//             {...register("additionalNotes")}
//             className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             placeholder="Extra details about the apartment"
//           />
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium">Upload Images</label>
//           <input 
//             type="file" 
//             {...register("images")}
//             accept="image/*" 
//             multiple 
//             onChange={handleImagePreview}
//             className="w-full mt-1 p-2 border rounded-lg"
//           />
//         </div>

//         {/* Image Preview */}
//         {previewImages.length > 0 && (
//           <div className="mt-3 flex gap-2 flex-wrap">
//             {previewImages.map((src, index) => (
//               <img key={index} src={src} alt="Preview" className="w-20 h-20 object-cover rounded-md border" />
//             ))}
//           </div>
//         )}

//         {/* Submit Button */}
//         <button 
//           type="submit" 
//           className=" py-3 px-8 text-sm bg-teal-500 hover:bg-teal-600 rounded text-white w-full border:border-none "
//         >
//           List this Apartment
//         </button>
//       </form>
//     </div>

//   );
// }