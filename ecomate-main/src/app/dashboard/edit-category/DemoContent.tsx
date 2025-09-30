// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { API_BASE_URL } from "@/lib/api"; // ✅ Import API base URL

// const EditProductPage = () => {
//   const router = useRouter();

//   const [basicInfo, setBasicInfo] = useState({
//     name: "Cashew",
//     category: "Dried Fruit",
//     description:
//       "Premium quality cashews with rich flavor and crunchy texture. Perfect for snacking, cooking, and baking.",
//   });

//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);
//   const [successMsg, setSuccessMsg] = useState<string | null>(null);

//   // Handle text changes for basic info
//   const handleBasicChange = (field: string, value: string) => {
//     setBasicInfo({ ...basicInfo, [field]: value });
//   };

//   const handleUpdateProduct = async () => {
//     setLoading(true);
//     setErrorMsg(null);
//     setSuccessMsg(null);

//     try {
//       const payload = {
//         categoryName: basicInfo.category, // ✅ matches backend field
//         description: basicInfo.description,
//       };

//       // ✅ Hardcoded ID = 6
//       const res = await axios.put(
//         `${API_BASE_URL}/api/categories/updatecategory/6`,
//         payload
//       );

//       if (res.status === 200) {
//         setSuccessMsg("Category updated successfully!");
//         setTimeout(() => {
//           router.push("/dashboard/category-list"); // redirect after update
//         }, 1500);
//       }
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       setErrorMsg(error.response?.data?.message || "Update failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-[1300px] mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold">Edit Category</h2>
//           <p className="text-gray-600 text-lg">
//             Update your category details and settings
//           </p>
//         </div>

//         {/* Alerts */}
//         {errorMsg && (
//           <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
//             {errorMsg}
//           </div>
//         )}
//         {successMsg && (
//           <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
//             {successMsg}
//           </div>
//         )}

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Section */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Basic Information */}
//             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
//               <h2 className="font-semibold text-xl mb-6 pb-3 border-b border-gray-200 text-gray-800">
//                 Basic Information
//               </h2>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2 text-gray-700">
//                     Category
//                   </label>
//                   <input
//                     type="text"
//                     value={basicInfo.category}
//                     onChange={(e) =>
//                       handleBasicChange("category", e.target.value)
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-800"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2 text-gray-700">
//                     Description
//                   </label>
//                   <textarea
//                     value={basicInfo.description}
//                     onChange={(e) =>
//                       handleBasicChange("description", e.target.value)
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 h-36 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-vertical text-gray-800"
//                     placeholder="Describe your category..."
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="space-y-8">
//           {/* Update & Cancel Buttons */}
//           <div className="flex flex-col rounded-xl w-[300px] bg-green-600 gap-4 mt-12">
//             <button
//               onClick={handleUpdateProduct}
//               disabled={loading}
//               className="w-[300px] text-white px-8 py-3 rounded-xl transition font-semibold text-lg hover:bg-green-700 disabled:opacity-50"
//             >
//               {loading ? "Updating..." : "Update Category"}
//             </button>
//           </div>
//           <div className="bg-green-600 w-[300px] rounded-xl">
//             <button
//               onClick={() => router.push("/dashboard/category-list")}
//               className="w-[300px] text-white px-8 py-3 rounded-xl transition font-semibold text-lg hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductPage;
