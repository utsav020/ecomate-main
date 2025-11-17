// "use client";

// import React, { useState, useEffect, Key } from "react";
// import HeaderOne from "@/components/header/HeaderOne";
// import ShortService from "@/components/service/ShortService";
// import RelatedProduct from "@/components/product/RelatedProduct";
// import FooterOne from "@/components/footer/FooterOne";
// import { useParams } from "next/navigation";
// import { Minus, Plus } from "lucide-react";
// import { useCart } from "@/components/header/CartContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// interface ProductImage {
//   image_id: number;
//   image_url: string;
// }

// interface ProductType {
//   _id?: string;
//   product_id?: number;
//   category_id?: number;
//   productName?: string;
//   regularPrice?: number;
//   salePrice?: number;
//   description?: string;
//   has_variants?: boolean | number;
//   productImages?: ProductImage[];
//   image?: string;
//   [key: string]: any;
// }

// // RatingProgressBar
// const RatingProgressBar = ({
//   rating,
//   percentage,
// }: {
//   rating: number;
//   percentage: number;
// }) => (
//   <div className="flex items-center gap-3">
//     <span className="text-sm text-gray-600 w-8">{rating}★</span>
//     <div className="flex-1 bg-gray-200 rounded-full h-2">
//       <div
//         className="bg-yellow-400 h-2 rounded-full"
//         style={{ width: `${percentage}%` }}
//       ></div>
//     </div>
//     <span className="text-sm text-gray-500 w-12">{percentage}%</span>
//   </div>
// );

// const CompareElements: React.FC = () => {
//   const { id } = useParams(); // ✅ dynamic ID from route
//   const [product, setProduct] = useState<ProductType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImage, setActiveImage] = useState<string>("");
//   const [quantity, setQuantity] = useState(1);
//   const [added, setAdded] = useState(false);
//   const [activeTab, setActiveTab] = useState<string>("tab1");

//   const { addToCart } = useCart();

//   // ✅ Fetch Product Data by ID
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `https://ekomart-backend.onrender.com/api/product/getproductbyid/${id}`
//         );

//         if (!res.ok) throw new Error("Failed to fetch product");
//         const data = await res.json();
//         setProduct(data);

//         if (data?.productImages?.length > 0) {
//           setActiveImage(data.productImages[0].image_url);
//         } else {
//           setActiveImage("/assets/images/placeholder.png");
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchProduct();
//   }, [id]);

//   // ✅ Add to cart handler
//   const handleAdd = () => {
//     if (!product) return;

//     addToCart({
//       id: product._id,
//       image: product.productImages?.[0]?.image_url ?? "/assets/images/placeholder.png",
//       productName: product.productName,
//       price: Number(product.salePrice ?? product.regularPrice),
//       quantity,
//       regularPrice: product.regularPrice,
//       active: true,
//       title: product.productName,
//     });

//     setAdded(true);
//     toast.success("🎉 Successfully Added To Cart!");
//     setTimeout(() => setAdded(false), 3000);
//   };

//   // ✅ Quantity Handlers
//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Loading Product...
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center max-w-md mx-auto p-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
//           <p className="text-gray-600 mb-6">
//             The product you’re looking for doesn’t exist or has been removed.
//           </p>
//           <a
//             href="/shop"
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
//           >
//             Return to Shop
//           </a>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Fallback thumbnails
//   const thumbnails =
//     product.productImages?.length > 0
//       ? product.productImages
//       : [
//           { image_id: 1, image_url: "/assets/images/shop/01.jpg" },
//           { image_id: 2, image_url: "/assets/images/shop/02.jpg" },
//         ];

//   // ✅ Sample Reviews (replace with API if available)
//   const reviewsData = [
//     {
//       id: 1,
//       username: "Ile Marthy",
//       rating: 5,
//       title: "Excellent Quality!",
//       comment: "Great products, very fresh and organic. Will buy again!",
//       date: "1/06/2025",
//       verified: true,
//       helpful: 12,
//       avatar: "I",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/30">
//       <HeaderOne />

//       {/* Breadcrumb */}
//       <div className="bg-white/80 border-b border-gray-200 py-4 sticky top-0 z-40">
//         <div className="container mx-auto px-4 flex gap-3 text-[16px]">
//           <a href="/" className="text-gray-500 hover:text-green-600">Home</a>
//           <i className="fa-regular fa-chevron-right text-gray-400" />
//           <a href="/shop" className="text-gray-500 hover:text-green-600">Shop</a>
//           <i className="fa-regular fa-chevron-right text-gray-400" />
//           <span className="text-green-600 font-semibold truncate">
//             {product.productName}
//           </span>
//         </div>
//       </div>

//       {/* Product Section */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-8 gap-8">
//           <div className="lg:col-span-8">
//             <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-8">
//               <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-12">
//                 {/* Left - Images */}
//                 <div className="space-y-6 max-w-[700px]">
//                   <div className="relative bg-white rounded-2xl overflow-hidden aspect-square border shadow-md border-gray-200">
//                     <img
//                       src={activeImage}
//                       alt={product.productName}
//                       className="w-full h-full object-contain p-6"
//                     />
//                   </div>

//                   {/* Thumbnails */}
//                   <div className="grid grid-cols-4 gap-4">
//                     {thumbnails.map((thumb) => (
//                       <div
//                         key={thumb.image_id}
//                         onClick={() => setActiveImage(thumb.image_url)}
//                         className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300 ${
//                           activeImage === thumb.image_url
//                             ? "border-green-500 scale-105"
//                             : "border-gray-200 hover:border-green-300"
//                         }`}
//                       >
//                         <img
//                           src={thumb.image_url}
//                           alt="thumb"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right - Info */}
//                 <div className="flex-1 space-y-6">
//                   <div className="flex justify-between items-center">
//                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                       🍃 Organic
//                     </span>
//                     <div className="text-yellow-400">★★★★★</div>
//                   </div>

//                   <h3 className="text-3xl font-bold">{product.productName}</h3>
//                   <p className="text-gray-600">{product.description}</p>

//                   {/* Price */}
//                   <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
//                     <div className="flex justify-between items-end">
//                       <span className="text-4xl font-bold text-green-700">
//                         Rs. {product.salePrice ?? product.regularPrice}
//                       </span>
//                       {product.salePrice && product.regularPrice && (
//                         <span className="line-through text-gray-400">
//                           Rs. {product.regularPrice}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Quantity */}
//                   <div className="flex items-center gap-6 mt-4">
//                     <span className="font-semibold">Quantity:</span>
//                     <div className="flex items-center border rounded-lg">
//                       <button
//                         onClick={decreaseQuantity}
//                         disabled={quantity <= 1}
//                         className="px-3 py-2 text-green-700"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="px-4">{quantity}</span>
//                       <button
//                         onClick={increaseQuantity}
//                         className="px-3 py-2 text-green-700"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
//                     <button
//                       onClick={handleAdd}
//                       className="border-2 border-green-600 text-green-700 font-bold py-4 rounded-full hover:bg-green-600 hover:text-white transition-all"
//                     >
//                       {added ? "✅ Added to Cart" : "🛒 Add to Cart"}
//                     </button>
//                     <button className="bg-green-600 text-white font-bold py-4 rounded-full hover:bg-green-700 transition-all">
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Customer Reviews */}
//           <div className="lg:col-span-8 mt-10">
//             <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden p-8">
//               <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
//               {reviewsData.map((r) => (
//                 <div key={r.id} className="border-b py-4">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="bg-green-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
//                       {r.avatar}
//                     </div>
//                     <div>
//                       <p className="font-bold">{r.username}</p>
//                       <p className="text-sm text-gray-500">{r.date}</p>
//                     </div>
//                   </div>
//                   <p className="font-semibold">{r.title}</p>
//                   <p className="text-gray-600">{r.comment}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <RelatedProduct />
//       <ShortService />
//       <FooterOne />

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default CompareElements;
