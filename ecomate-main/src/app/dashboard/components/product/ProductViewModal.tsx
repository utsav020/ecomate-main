"use client";

import React from "react";
import { X, SquarePen, Eye, Trash2 } from "lucide-react";


interface Variant {
  product_category_id: number;
  productCategoryName: string;
  regularPrice: string;
  salePrice: string;
  weights: string;
  quantity: number;
  is_default: number;
}

interface Product {
  product_id: number;
  category_id: number;
  productName: string;
  regularPrice: string | null;
  salePrice: string | null;
  weights: string | null;
  quantity: string | number | null;
  description: string;
  has_variants: number;
  variants?: Variant[];
}

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductViewModal: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  const formatPrice = (price: string | null) => {
    if (!price) return "-";
    return `₹${parseFloat(price).toLocaleString("en-IN")}`;
  };

  const hasDiscount = (regular: string | null, sale: string | null) => {
    if (!regular || !sale) return false;
    return parseFloat(regular) > parseFloat(sale);
  };

  const calculateDiscount = (regular: string, sale: string) => {
    const reg = parseFloat(regular);
    const sal = parseFloat(sale);
    return Math.round(((reg - sal) / reg) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex w-full justify-between items-start">
            <div className="">
              <h2 className="text-2xl font-bold mb-1">{product.productName}</h2>
              <p className="text-white font-bold">
                Product ID: #{product.product_id}
              </p>
            </div>
            <div className="">
              <button
                onClick={onClose}
                className="bg-white/20 text-white hover:bg-white/30 p-2 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                <X />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Price Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                Pricing Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Regular Price:</span>
                  <span className="font-semibold">
                    {formatPrice(product.regularPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sale Price:</span>
                  <span
                    className={`font-bold ${
                      hasDiscount(product.regularPrice, product.salePrice)
                        ? "text-green-600"
                        : "text-gray-800"
                    }`}
                  >
                    {formatPrice(product.salePrice)}
                  </span>
                </div>
                {hasDiscount(product.regularPrice, product.salePrice) &&
                  product.regularPrice &&
                  product.salePrice && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">You Save:</span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                        {calculateDiscount(
                          product.regularPrice,
                          product.salePrice
                        )}
                        % OFF
                      </span>
                    </div>
                  )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                Stock Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity:</span>
                  <span
                    className={`font-bold ${
                      parseInt(product.quantity as string) > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.quantity ?? "0"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold">
                    {product.weights || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category ID:</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-md font-medium">
                    #{product.category_id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
              Product Description
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          {/* Variants Section */}
          {product.has_variants &&
            product.variants &&
            product.variants.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Product Variants ({product.variants.length})
                </h3>
                <div className="space-y-3">
                  {product.variants.map((variant, index) => (
                    <div
                      key={variant.product_category_id}
                      className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-3 h-15">
                          <div className="bg-blue-100 flex items-center justify-center w-10 h-10 rounded-full">
                            <span className="text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-md font-bold mr-0">
                            {index + 1}
                          </span>
                          </div>
                          <h4 className="font-semibold text-gray-800">
                            {variant.productCategoryName}
                          </h4>
                          {variant.is_default === 1 && (
                            <span className="ml-2 w-18 text-center h-7 bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm font-medium">
                              Default
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-md">
                        <div>
                          <span className="text-gray-500">Regular:</span>
                          <p className="font-medium">
                            {formatPrice(variant.regularPrice)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Sale:</span>
                          <p className="font-medium text-green-600">
                            {formatPrice(variant.salePrice)}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Weight:</span>
                          <p className="font-medium">{variant.weights}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Stock:</span>
                          <p
                            className={`font-bold ${
                              variant.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {variant.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;
