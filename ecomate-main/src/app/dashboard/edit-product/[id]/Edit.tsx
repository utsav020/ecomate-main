// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { Upload, TextAlignStart } from "lucide-react";
// // import axios from "axios";
// // import { useRouter, useSearchParams } from "next/navigation";

// // interface Product {
// //   product_id?: number;
// //   productName: string;
// //   category: string;
// //   description: string;
// //   details: string[];
// //   highlights: string[];
// //   features: string[];
// //   mainImage?: string | null;
// //   galleryImages?: string[];
// //   additionalImages?: string[];
// // }

// // const EditProductPage = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const productId = searchParams.get("id"); // URL: /edit-product?id=6

// //   const [product, setProduct] = useState<Product>({
// //     productName: "",
// //     category: "",
// //     description: "",
// //     details: [],
// //     highlights: [],
// //     features: [],
// //     mainImage: null,
// //     galleryImages: [],
// //     additionalImages: [],
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState<string | null>(null);
// //   const [successMsg, setSuccessMsg] = useState<string | null>(null);

// //   // Fetch product by ID
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       if (!productId) return;
// //       setLoading(true);
// //       setErrorMsg(null);

// //       try {
// //         const res = await axios.get(
// //           `https://ekomart-backend.onrender.com/api/product/getproductbyid/${productId}`
// //         );
// //         const data = res.data;
// //         setProduct({
// //           product_id: data.product_id,
// //           productName: data.productName || data.name || "",
// //           category: data.category || "",
// //           description: data.description || "",
// //           details: data.details || [],
// //           highlights: data.highlights || [],
// //           features: data.features || [],
// //           mainImage: data.mainImage || null,
// //           galleryImages: data.galleryImages || [],
// //           additionalImages: data.additionalImages || [],
// //         });
// //       } catch (error: any) {
// //         console.error("Failed to fetch product:", error);
// //         setErrorMsg("Failed to load product data.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, [productId]);

// //   // Handle text input changes
// //   const handleChange = (field: keyof Product, value: string) => {
// //     setProduct((prev) => ({ ...prev, [field]: value }));
// //   };

// //   // Handle array changes
// //   const handleArrayChange = (
// //     field: "details" | "highlights" | "features",
// //     idx: number,
// //     value: string
// //   ) => {
// //     setProduct((prev) => {
// //       const updatedArray = [...prev[field]];
// //       updatedArray[idx] = value;
// //       return { ...prev, [field]: updatedArray };
// //     });
// //   };

// //   const addArrayItem = (field: "details" | "highlights" | "features") => {
// //     setProduct((prev) => ({
// //       ...prev,
// //       [field]: [...prev[field], ""],
// //     }));
// //   };

// //   const removeArrayItem = (
// //     field: "details" | "highlights" | "features",
// //     idx: number
// //   ) => {
// //     setProduct((prev) => {
// //       const updatedArray = [...prev[field]];
// //       updatedArray.splice(idx, 1);
// //       return { ...prev, [field]: updatedArray };
// //     });
// //   };

// //   // Image upload handling
// //   const handleImageUpload = (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     type: "main" | "gallery" | "additional"
// //   ) => {
// //     const files = e.target.files;
// //     if (!files) return;
// //     if (type === "main") {
// //       setProduct((prev) => ({
// //         ...prev,
// //         mainImage: URL.createObjectURL(files[0])
// //       }));
// //     } else {
// //       const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
// //       setProduct((prev) => ({
// //         ...prev,
// //         [type === "gallery" ? "galleryImages" : "additionalImages"]: [
// //           ...(prev[type === "gallery" ? "galleryImages" : "additionalImages"] ?? []),
// //           ...newImages,
// //         ],
// //       }));
// //     }
// //   };

// //   // Remove image
// //   const removeImage = (
// //     type: "main" | "gallery" | "additional",
// //     idx?: number
// //   ) => {
// //     if (type === "main") {
// //       setProduct((prev) => ({ ...prev, mainImage: null }));
// //     } else {
// //       const key = type === "gallery" ? "galleryImages" : "additionalImages";
// //       setProduct((prev) => {
// //         const arr = [...(prev[key] ?? [])];
// //         if (idx !== undefined) arr.splice(idx, 1);
// //         return { ...prev, [key]: arr };
// //       });
// //     }
// //   };

// //   // Update product API call (correct endpoint)
// //   const handleUpdateProduct = async () => {
// //     if (!productId) return;
// //     setLoading(true);
// //     setErrorMsg(null);
// //     setSuccessMsg(null);

// //     try {
// //       const payload = {
// //         productName: product.productName,
// //         category: product.category,
// //         description: product.description,
// //         details: product.details,
// //         highlights: product.highlights,
// //         features: product.features,
// //         mainImage: product.mainImage,
// //         galleryImages: product.galleryImages,
// //         additionalImages: product.additionalImages,
// //       };

// //       const res = await axios.put(
// //         `https://ekomart-backend.onrender.com/api/product/updateproduct/${productId}`,
// //         payload
// //       );
// //       if (res.status === 200) {
// //         setSuccessMsg("Product updated successfully!");
// //         setTimeout(() => {
// //           router.push("/dashboard/product-list");
// //         }, 1500);
// //       }
// //     } catch (error: any) {
// //       console.error("Update failed:", error);
// //       setErrorMsg(error.response?.data?.message || "Update failed!");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Image upload section component
// //   const ImageUploadSection = ({
// //     title,
// //     type,
// //     images,
// //   }: {
// //     title: string;
// //     type: "main" | "gallery" | "additional";
// //     images: string | string[];
// //   }) => {
// //     const fileInputRef = useRef<HTMLInputElement | null>(null);
// //     return (
// //       <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
// //         <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
// //         <div className="mb-4 flex flex-wrap gap-3">
// //           {type === "main" && images ? (
// //             <div className="relative inline-block">
// //               <img
// //                 src={images as string}
// //                 alt="Main"
// //                 className="w-32 h-32 object-cover rounded-lg border border-gray-200"
// //               />
// //               <button
// //                 onClick={() => removeImage("main")}
// //                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           ) : null}
// //           {type !== "main" &&
// //             Array.isArray(images) &&
// //             images.map((src, idx) => (
// //               <div key={idx} className="relative inline-block">
// //                 <img
// //                   src={src}
// //                   alt={`img-${idx}`}
// //                   className="w-24 h-24 object-cover rounded-lg border border-gray-200"
// //                 />
// //                 <button
// //                   onClick={() => removeImage(type, idx)}
// //                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
// //                 >
// //                   ×
// //                 </button>
// //               </div>
// //             ))}
// //         </div>
// //         <div
// //           onClick={() => fileInputRef.current?.click()}
// //           className="border-2 border-dashed border-green-600 p-4 text-center rounded-lg cursor-pointer hover:border-green-400"
// //         >
// //           <div className="flex items-center justify-center gap-2 text-green-600">
// //             <Upload size={20} /> {type === "main" ? "Upload Main Image" : "Upload Images"}
// //           </div>
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             onChange={(e) => handleImageUpload(e, type)}
// //             multiple={type !== "main"}
// //             className="hidden"
// //             accept="image/*"
// //           />
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-[1300px] mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h2 className="text-2xl font-bold">Edit Product</h2>
// //           <p className="text-gray-600 text-lg">
// //             Update your product details, images, highlights, and features
// //           </p>
// //         </div>
// //         {/* Loading and Alerts
// //         {loading && (
// //           <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">
// //             Loading...
// //           </div>
// //         )}
// //         {errorMsg && (
// //           <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
// //             {errorMsg}
// //           </div>
// //         )}
// //         {successMsg && (
// //           <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
// //             {successMsg}
// //           </div>
// //         )} */}
// //         <div className="grid lg:grid-cols-3 gap-8">
// //           {/* Left Section */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Basic Info */}
// //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
// //               <h2 className="font-semibold text-xl mb-6 pb-3 border-b border-gray-200 text-gray-800">
// //                 Basic Information
// //               </h2>
// //               <div className="space-y-6">
// //                 <div>
// //                   <label className="block text-sm font-semibold mb-2 text-gray-700">Product Name</label>
// //                   <input
// //                     type="text"
// //                     value={product.productName || ""}
// //                     onChange={(e) => handleChange("productName", e.target.value)}
// //                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
// //                   <input
// //                     type="text"
// //                     value={product.category || ""}
// //                     onChange={(e) => handleChange("category", e.target.value)}
// //                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
// //                   <textarea
// //                     value={product.description || ""}
// //                     onChange={(e) => handleChange("description", e.target.value)}
// //                     className="w-full border border-gray-300 rounded-xl px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-vertical"
// //                     placeholder="Describe your product..."
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //             {/* Product Details */}
// //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
// //               <div className="mb-6 pb-3 border-b border-gray-200 flex justify-between items-center">
// //                 <h2 className="font-semibold text-xl text-gray-800">Product Details</h2>
// //                 <button
// //                   onClick={() => addArrayItem("details")}
// //                   className="text-green-600 hover:text-green-800 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition"
// //                 >
// //                   <span className="text-xl">+</span> Add Detail
// //                 </button>
// //               </div>
// //               <div className="grid md:grid-cols-2 gap-6">
// //                 {product.details.map((detail, idx) => (
// //                   <div
// //                     key={idx}
// //                     className="relative bg-gray-50 p-5 rounded-xl border border-gray-200 hover:border-green-300 transition"
// //                   >
// //                     <textarea
// //                       value={detail}
// //                       onChange={(e) => handleArrayChange("details", idx, e.target.value)}
// //                       className="w-full border-none bg-transparent resize-none focus:outline-none focus:ring-0 min-h-[120px]"
// //                       placeholder="Enter product detail..."
// //                     />
// //                     <button
// //                       onClick={() => removeArrayItem("details", idx)}
// //                       className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
// //                     >
// //                       ×
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //             {/* Highlights & Features */}
// //             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
// //               <div className="flex items-center mb-6 gap-4">
// //                 <TextAlignStart />
// //                 <h2 className="font-semibold text-xl text-gray-800">Highlights & Features</h2>
// //               </div>
// //               <div className="grid md:grid-cols-2 gap-8">
// //                 {/* Highlights */}
// //                 <div>
// //                   {product.highlights.map((highlight, idx) => (
// //                     <div key={idx} className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-2 mb-2">
// //                       <input
// //                         type="text"
// //                         value={highlight}
// //                         onChange={(e) => handleArrayChange("highlights", idx, e.target.value)}
// //                         className="bg-transparent border-none focus:outline-none"
// //                       />
// //                       <button
// //                         onClick={() => removeArrayItem("highlights", idx)}
// //                         className="ml-2 text-red-500 hover:text-red-700 font-bold"
// //                       >
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                   <button
// //                     onClick={() => addArrayItem("highlights")}
// //                     className="px-4 py-2 border border-dashed border-green-500 text-green-600 rounded-lg hover:bg-green-50"
// //                   >
// //                     + Add Highlight
// //                   </button>
// //                 </div>
// //                 {/* Features */}
// //                 <div>
// //                   {product.features.map((feature, idx) => (
// //                     <div key={idx} className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-2 mb-2">
// //                       <input
// //                         type="text"
// //                         value={feature}
// //                         onChange={(e) => handleArrayChange("features", idx, e.target.value)}
// //                         className="bg-transparent border-none focus:outline-none"
// //                       />
// //                       <button
// //                         onClick={() => removeArrayItem("features", idx)}
// //                         className="ml-2 text-red-500 hover:text-red-700 font-bold"
// //                       >
// //                         ×
// //                       </button>
// //                     </div>
// //                   ))}
// //                   <button
// //                     onClick={() => addArrayItem("features")}
// //                     className="px-4 py-2 border border-dashed border-green-500 text-green-600 rounded-lg hover:bg-green-50"
// //                   >
// //                     + Add Feature
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           {/* Right Section */}
// //           <div className="space-y-8">
// //             <ImageUploadSection title="Main Image" type="main" images={product.mainImage ?? ""} />
// //             <ImageUploadSection title="Gallery Images" type="gallery" images={product.galleryImages ?? []} />
// //             <ImageUploadSection title="Additional Images" type="additional" images={product.additionalImages ?? []} />
// //             {/* Update & Cancel Buttons */}
// //             <div className="flex flex-col gap-4 mt-4">
// //               <button
// //                 onClick={handleUpdateProduct}
// //                 disabled={loading}
// //                 className="w-full bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
// //               >
// //                 {loading ? "Updating..." : "Update Product"}
// //               </button>
// //               <button
// //                 onClick={() => router.push("/dashboard/product-list")}
// //                 className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition font-semibold"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EditProductPage;

// {
//   /* Product Info */
// }
// <div className="bg-white w-full rounded-xl shadow-sm border p-6 space-y-4">
//   {(
//     [
//       {
//         key: "key_features",
//         state: newFeature,
//         setter: setNewFeature,
//       },
//       {
//         key: "health_benefits",
//         state: newHighlight,
//         setter: setNewHighlight,
//       },
//       {
//         key: "nutrition_value",
//         state: newNutrition,
//         setter: setNewNutrition,
//       },
//       {
//         key: "how_to_prepare",
//         state: newPreparation,
//         setter: setNewPreparation,
//       },
//     ] as {
//       key: keyof ProductInfo;
//       state: string;
//       setter: React.Dispatch<React.SetStateAction<string>>;
//     }[]
//   ).map((f) => (
//     <div className="w-full border-2 p-2" key={f.key}>
//       <div className="flex w-full justify-between">
//         <h3 className="text-lg font-semibold capitalize">
//           {f.key.replace("_", " ")}
//         </h3>
//         <div className="mt-4">
//           <button
//             type="button"
//             onClick={() => addItem(f.key, f.state, f.setter)}
//             className="bg-blue-600 text-black px-4 rounded-lg"
//           >
//             + Add
//           </button>
//         </div>
//       </div>
//       <div className="flex w-full flex-col gap-2 mt-2">
//         {(productInfo[f.key] || []).map((item, idx) => (
//           <div key={idx} className="flex gap-2 border rounded-lg items-center">
//             <input
//               type="text"
//               value={item}
//               className="p-2 rounded-lg flex-1"
//               onChange={(e) =>
//                 handleProductInfoChange(f.key, idx, e.target.value)
//               }
//             />
//             <div className="">
//               <button
//                 type="button"
//                 onClick={() => removeItem(f.key, idx)}
//                 className="text-red-600"
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         ))}
//         <input
//           type="text"
//           placeholder={`Add ${f.key.replace("_", " ")}`}
//           className="border p-2 rounded-lg mt-2"
//           value={f.state}
//           onChange={(e) => f.setter(e.target.value)}
//         />
//       </div>
//     </div>
//   ))}
// </div>;
