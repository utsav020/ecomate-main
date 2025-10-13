"use client";

import { useState, useEffect } from "react";
import ProductDetails from "@/components/modal/ProductDetails";
import CompareModal from "@/components/modal/CompareModal";
import { useCart } from "@/components/header/CartContext";
import { useWishlist } from "@/components/header/WishlistContext";
import { useCompare } from "@/components/header/CompareContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BlogGridMainProps {
  Slug: string;
  ProductImage: string;
  ProductTitle?: string;
  Price?: string;
}

const BlogGridMain: React.FC<BlogGridMainProps> = ({
  Slug,
  ProductImage,
  ProductTitle,
  Price,
}) => {
  type ModalType = "one" | "two" | "three" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const handleClose = () => setActiveModal(null);

  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { addToCompare } = useCompare();

  const [added, setAdded] = useState(false);

  // ✅ Toast helper
  const notify = (
    message: string,
    type: "success" | "info" | "warning" | "error" = "success"
  ) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
  };

  const handleAdd = () => {
    addToCart({
      id: Date.now(),
      image: `/assets/images/grocery/${ProductImage}`,
      title: ProductTitle ?? "Default Product Title",
      price: parseFloat(Price ?? "0"),
      quantity: 1,
      active: true,
    });
    setAdded(true);
    notify("🛒 Added to Cart!", "success");
  };

  const handleWishlist = () => {
    addToWishlist({
      id: Date.now(),
      image: `/assets/images/grocery/${ProductImage}`,
      title: ProductTitle ?? "Default Product Title",
      price: parseFloat(Price ?? "0"),
      quantity: 1,
    });
    notify("❤️ Added to Wishlist!", "success");
  };

  const handleCompare = () => {
    addToCompare({
      image: `/assets/images/grocery/${ProductImage}`,
      name: ProductTitle ?? "Default Product Title",
      price: Price ?? "0",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      rating: 5,
      ratingCount: 25,
      weight: "500g",
      inStock: true,
    });
    notify("📊 Added to Compare!", "success");
  };

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
      buttons.forEach((button) =>
        button.removeEventListener("click", handleQuantityClick)
      );
    };
  }, []);

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-white transition-all hover:shadow-lg">
        {/* Product Image */}
        <div className="relative">
          <a
            href={`/shop/${Slug}`}
            className="block overflow-hidden rounded-t-xl"
          >
            <div className="absolute -left-3 top-3 z-10 bg-green-500 text-center text-white text-[12px] w-[70px] font-semibold px-2 py-1 rounded-full">
              25% Off
            </div>
            <img
              src={`/assets/images/grocery/${ProductImage}`}
              alt="grocery"
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all">
            <div className="bg-white rounded-full shadow hover:bg-gray-100 transition">
              <button
                title="Add To Wishlist"
                onClick={handleWishlist}
                className="p-2 transition"
              >
                <i className="fa-regular fa-heart text-gray-700 hover:text-green-500" />
              </button>
            </div>
            <div className="bg-white rounded-full shadow hover:bg-gray-100 transition">
              <button
                title="Compare"
                onClick={handleCompare}
                className="p-2 "
              >
                <i className="fa-solid fa-arrows-retweet text-gray-700 hover:text-green-500" />
              </button>
            </div>
            <div className="bg-white rounded-full shadow hover:bg-gray-100 transition">
              <button
                title="Quick View"
                onClick={() => setActiveModal("two")}
                className="p-2"
              >
                <i className="fa-regular fa-eye text-gray-700 hover:text-green-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <a href={`/shop/${Slug}`}>
            <h4 className="text-base max-w-sm mx-auto text-center w-auto font-semibold text-gray-800 hover:text-primary transition">
              {ProductTitle ?? "How to growing your business"}
            </h4>
          </a>
          {/* <span className="block text-[16px] text-gray-500">500g Pack</span> */}

          <div className="flex items-center justify-center gap-2">
            <span className="text-[18px] font-semibold text-black">{`Rs. ${Price}`}</span>
            <span className="text-[14px] text-gray-400 line-through">$36.00</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* <div className="quantity-edit flex items-center border rounded-md overflow-hidden">
              <button className="button minus px-3 py-2 text-gray-600 hover:bg-gray-100">
                <i className="fa-regular fa-chevron-down" />
              </button>
              <input
                type="text"
                className="input w-10 text-center border-x outline-none text-gray-700"
                defaultValue={1}
              />
              <button className="button plus px-3 py-2 text-gray-600 hover:bg-gray-100">
                <i className="fa-regular fa-chevron-up" />
              </button>
            </div> */}

           <div className="flex items-center mx-auto justify-center h-20 max-w-xs w-full border-2 gap-4 bg-white text-black px-4 py-2 rounded-full font-medium shadow hover:bg-primary/90 transition">
             <div className="">
              <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <span>{added ? "Added" : "Add to Cart"}</span>
            </a>
             </div>
            <div className="">
              <i
                className={
                  added
                    ? "fa-solid fa-check text-black"
                    : "fa-regular fa-cart-shopping text-black"
                }
              />
            </div>
           </div>
          </div>
        </div>
      </div>

      <CompareModal show={activeModal === "one"} handleClose={handleClose} />
      <ProductDetails
        show={activeModal === "two"}
        handleClose={handleClose}
        productImage={`/assets/images/grocery/${ProductImage}`}
        productTitle={ProductTitle ?? "Default Product Title"}
        productPrice={Price ?? "0"}
      />
    </>
  );
};

export default BlogGridMain;
