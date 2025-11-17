// "use client";

// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
// import ProductData from "@/data/Product.json"; // fallback data
// import { useCategory } from "@/components/context/CategoryContext";

// interface ProductType {
//   _id?: string;
//   slug: string;
//   category_id?: number;
//   category?: string;
//   image: string;
//   title?: string;
//   productName?: string;
//   salePrice?: number | string;
//   regularPrice?: number | string;
// }

// const FeatureProduct: React.FC = () => {
//   const { selectedCategory } = useCategory();
//   const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   // ✅ STEP 1: Determine which category to use (context or localStorage)
//   useEffect(() => {
//     const storedProduct = localStorage.getItem("selectedProduct");
//     const storedCategory = localStorage.getItem("activeCategory");

//     let categoryToUse = "";

//     if (selectedCategory && selectedCategory.trim() !== "") {
//       categoryToUse = selectedCategory;
//       localStorage.setItem("activeCategory", selectedCategory);
//     } else if (storedProduct) {
//       try {
//         const parsedProduct = JSON.parse(storedProduct);
//         if (parsedProduct?.category_id) {
//           categoryToUse = parsedProduct.category_id;
//           localStorage.setItem("activeCategory", parsedProduct.category_id);
//         }
//       } catch (error) {
//         console.error("⚠️ Error parsing stored product:", error);
//       }
//     } else if (storedCategory) {
//       categoryToUse = storedCategory;
//     }

//     setActiveCategory(categoryToUse);
//   }, [selectedCategory]);

//   // ✅ STEP 2: Fetch related products from backend
//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       if (!activeCategory) {
//         setFilteredProducts(ProductData.slice(0, 8));
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(
//           `https://ekomart-backend.onrender.com/api/product/getproductbycategory/${activeCategory}`
//         );

//         if (!res.ok) throw new Error("API fetch failed");

//         const data = await res.json();
//         if (Array.isArray(data) && data.length > 0) {
//           setFilteredProducts(data);
//         } else {
//           console.warn(`⚠️ No products found for category ID: ${activeCategory}`);
//           setFilteredProducts(ProductData.slice(0, 8));
//         }
//       } catch (error) {
//         console.error("❌ Error fetching category products:", error);
//         setFilteredProducts(ProductData.slice(0, 8)); // fallback
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRelatedProducts();
//   }, [activeCategory]);

//   // ✅ STEP 3: Handle quantity controls
//   useEffect(() => {
//     const handleQuantityClick = (e: Event) => {
//       const button = e.currentTarget as HTMLElement;
//       const parent = button.closest(".quantity-edit") as HTMLElement | null;
//       if (!parent) return;

//       const input = parent.querySelector(".input") as HTMLInputElement | null;
//       const addToCart = parent.querySelector("a.add-to-cart") as HTMLElement | null;
//       if (!input) return;

//       let oldValue = parseInt(input.value || "1", 10);
//       let newVal = oldValue;

//       if (button.classList.contains("plus")) newVal = oldValue + 1;
//       else if (button.classList.contains("minus")) newVal = Math.max(1, oldValue - 1);

//       input.value = newVal.toString();
//       if (addToCart) addToCart.setAttribute("data-quantity", newVal.toString());
//     };

//     const buttons = document.querySelectorAll(".quantity-edit .button");
//     buttons.forEach((button) => {
//       button.removeEventListener("click", handleQuantityClick);
//       button.addEventListener("click", handleQuantityClick);
//     });

//     return () => {
//       buttons.forEach((button) => {
//         button.removeEventListener("click", handleQuantityClick);
//       });
//     };
//   }, []);

//   // ✅ Loading & No Product States
//   if (loading)
//     return (
//       <div className="text-center py-16 text-gray-500">
//         Loading related products...
//       </div>
//     );

//   if (filteredProducts.length === 0)
//     return (
//       <div className="text-center py-16 text-gray-500">
//         No related products found.
//       </div>
//     );

//   return (
//     <div className="rts-grocery-feature-area rts-section-gap">
//       <div className="container">
//         {/* Section Title */}
//         <div className="row">
//           <div className="col-lg-12">
//             <div className="title-area-between">
//               <h2 className="title-left">
//                 {activeCategory
//                   ? "Related Products"
//                   : "Featured Products"}
//               </h2>
//               <div className="next-prev-swiper-wrapper">
//                 <div className="swiper-button-prev">
//                   <i className="fa-regular fa-chevron-left" />
//                 </div>
//                 <div className="swiper-button-next">
//                   <i className="fa-regular fa-chevron-right" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Swiper Section */}
//         <div className="category-area-main-wrapper-one">
//           <Swiper
//             modules={[Navigation, Autoplay]}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             loop={true}
//             navigation={{
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             }}
//             className="mySwiper-category-1"
//             breakpoints={{
//               0: { slidesPerView: 1, spaceBetween: 20 },
//               320: { slidesPerView: 2, spaceBetween: 20 },
//               480: { slidesPerView: 3, spaceBetween: 25 },
//               640: { slidesPerView: 3, spaceBetween: 25 },
//               840: { slidesPerView: 4, spaceBetween: 30 },
//               1140: { slidesPerView: 4, spaceBetween: 30 },
//             }}
//           >
//             {filteredProducts.map((post: ProductType, index: number) => (
//               <SwiperSlide key={index}>
//                 <div
//                   className="single-shopping-card-one"
//                   onClick={() => {
//                     localStorage.setItem("selectedProduct", JSON.stringify(post));
//                     if (post.category_id)
//                       localStorage.setItem("activeCategory", post.category_id.toString());
//                   }}
//                 >
// <WeeklyBestSellingMain
//   Slug={post.slug || post._id?.toString() || ""}
//   ProductImage={post.image ||
//     "/assets/images/products/Oats.png"}
//   ProductTitle={post.title || post.productName || "Product"}
//   Price={post.salePrice
//     ? `₹${post.salePrice}`
//     : post.regularPrice
//       ? `₹${post.regularPrice}`
//       : "₹0.00"} regularPrice={`${post.regularPrice}`} id={0} image={""} title={""} price={0} quantity={0} active={false} productImage={""} productName={""}                  />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureProduct;

"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import WeeklyBestSellingMain from "@/components/product-main/WeeklyBestSellingMain";
import ProductData from "@/data/Product.json"; // fallback data
import { useCategory } from "@/components/context/CategoryContext";
import "swiper/css";
import "swiper/css/navigation";

interface ProductType {
  _id?: string;
  slug: string;
  category_id?: string | number;
  category?: string;
  image: string;
  title?: string;
  productName?: string;
  salePrice?: number | string;
  regularPrice?: number | string;
}

const FeatureProduct: React.FC = () => {
  const { selectedCategory } = useCategory();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Step 1: Determine which category to use
  useEffect(() => {
    const storedProduct = localStorage.getItem("selectedProduct");
    const storedCategory = localStorage.getItem("activeCategory");

    let categoryToUse = "";

    if (selectedCategory && selectedCategory.trim() !== "") {
      categoryToUse = selectedCategory;
      localStorage.setItem("activeCategory", selectedCategory);
    } else if (storedProduct) {
      try {
        const parsedProduct = JSON.parse(storedProduct);
        if (parsedProduct?.category_id) {
          categoryToUse = parsedProduct.category_id.toString();
          localStorage.setItem("activeCategory", categoryToUse);
        }
      } catch (error) {
        console.error("⚠️ Error parsing stored product:", error);
      }
    } else if (storedCategory) {
      categoryToUse = storedCategory;
    }

    setActiveCategory(categoryToUse);
  }, [selectedCategory]);

  // ✅ Step 2: Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "";

        if (
          !activeCategory ||
          activeCategory === "All Products" ||
          activeCategory.toLowerCase() === "all"
        ) {
          url =
            "https://ekomart-backend.onrender.com/api/product/getallproduct";
        } else {
          url = `https://ekomart-backend.onrender.com/api/product/getproductbycategory/${activeCategory}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("API fetch failed");

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFilteredProducts(data);
        } else {
          console.warn("⚠️ No products found for:", activeCategory);
          setFilteredProducts(ProductData.slice(0, 8));
        }
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setFilteredProducts(ProductData.slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  // ✅ Step 3: Quantity button logic (kept for compatibility)
  useEffect(() => {
    const handleQuantityClick = (e: Event) => {
      const button = e.currentTarget as HTMLElement;
      const parent = button.closest(".quantity-edit") as HTMLElement | null;
      if (!parent) return;

      const input = parent.querySelector(".input") as HTMLInputElement | null;
      const addToCart = parent.querySelector(
        "a.add-to-cart"
      ) as HTMLElement | null;
      if (!input) return;

      let oldValue = parseInt(input.value || "1", 10);
      let newVal = oldValue;

      if (button.classList.contains("plus")) newVal = oldValue + 1;
      else if (button.classList.contains("minus"))
        newVal = Math.max(1, oldValue - 1);

      input.value = newVal.toString();
      if (addToCart) addToCart.setAttribute("data-quantity", newVal.toString());
    };

    const buttons = document.querySelectorAll(".quantity-edit .button");
    buttons.forEach((button) => {
      button.removeEventListener("click", handleQuantityClick);
      button.addEventListener("click", handleQuantityClick);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", handleQuantityClick);
      });
    };
  }, []);

  // ✅ Step 4: Loading & Empty States
  if (loading)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading related products...
      </div>
    );

  if (filteredProducts.length === 0)
    return (
      <div className="text-center py-20 text-gray-500 text-lg">
        No related products found.
      </div>
    );

  // ✅ Step 5: Render Products
  return (
    <div className="w-full mt-[100px] max-w-[1730px] mx-auto">
      <div className="">
        {/* Section Title */}
        <div className="flex justify-between items-center mb-8">
          <div className="">
            <div className="">
              <p className="text-[35px] font-bold">
              {activeCategory ? "Recommended products" : "Featured Products"}
            </p>
            </div>
            <div className="h-[77px] w-[613px]">
              <p className="text-[30px] leading-[76.5px]">Naturally grown, carefully selected Products</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="">
              <button className="border border-gray-300 p-2 rounded-md hover:bg-gray-100">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
            </div>
            <div className="">
              <button className="border border-gray-300 p-2 rounded-md hover:bg-gray-100">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Product Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1440: { slidesPerView: 4, spaceBetween: 10 },
            1730: { slidesPerView: 5, spaceBetween: 10 },
          }}
          className="pb-10"
        >
          {filteredProducts.map((product: ProductType, index: number) => (
            <SwiperSlide key={index}>
              <div
                className="w-[332px] cursor-pointer"
                onClick={() => {
                  localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify(product)
                  );
                  if (product.category_id)
                    localStorage.setItem(
                      "activeCategory",
                      product.category_id.toString()
                    );
                }}
              >
                <WeeklyBestSellingMain
                  Slug={product.slug || product._id?.toString() || ""}
                  ProductImage={
                    product.image || "/assets/images/products/Oats.png"
                  }
                  ProductTitle={
                    product.title || product.productName || "Product"
                  }
                  Price={
                    product.salePrice
                      ? `₹${product.salePrice}`
                      : product.regularPrice
                      ? `₹${product.regularPrice}`
                      : "₹0.00"
                  }
                  regularPrice={`${product.regularPrice}`}
                  id={0}
                  image={""}
                  title={""}
                  price={0}
                  quantity={0}
                  active={false}
                  productImage={""}
                  productName={""}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureProduct;
