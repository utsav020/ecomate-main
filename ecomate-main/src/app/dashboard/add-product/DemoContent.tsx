"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

const AddProductPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { category_id: number; categoryName: string }[]
  >([]);

  const [formData, setFormData] = useState({
    category_id: "",
    productName: "",
    description: "",
    has_variants: false,
    regularPrice: "",
    salePrice: "",
    weights: "",
    quantity: "",
    variants: [
      {
        productCategoryName: "",
        regularPrice: "",
        salePrice: "",
        weights: "",
        quantity: "",
        is_default: true,
      },
    ],
  });

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/categories/getallcategory`
        );

        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (response.data.categories) {
          setCategories(response.data.categories);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        setErrorMsg("Failed to load categories.");
      }
    };

    fetchCategories();
  }, []);

  // ✅ Handle input
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ✅ Handle variant input
  const handleVariantChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const newVariants = [...formData.variants];
    (newVariants[index] as any)[field] = value;
    setFormData((prev) => ({ ...prev, variants: newVariants }));
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      // Ensure numeric fields are converted
      const payload = {
        ...formData,
        category_id: Number(formData.category_id),
        variants: formData.variants.map((v) => ({
          ...v,
          regularPrice: Number(v.regularPrice),
          salePrice: Number(v.salePrice),
          quantity: Number(v.quantity),
        })),
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/product/addproduct`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("✅ Product submitted successfully:", response.data);
      alert("Product submitted successfully!");

      // Handle variant change
      const handleVariantChange = (
        index: number,
        field: string,
        value: string | boolean
      ) => {
        const newVariants = [...formData.variants];
        (newVariants[index] as any)[field] = value;
        setFormData((prev) => ({ ...prev, variants: newVariants }));
      };

      // Add variant
      const addVariant = () => {
        setFormData((prev) => ({
          ...prev,
          variants: [
            ...prev.variants,
            {
              productCategoryName: "",
              regularPrice: "",
              salePrice: "",
              weights: "",
              quantity: "",
              is_default: false,
              image: null,
            },
          ],
        }));
      };

      // Remove variant
      const removeVariant = (index: number) => {
        const newVariants = [...formData.variants];
        newVariants.splice(index, 1);
        setFormData((prev) => ({ ...prev, variants: newVariants }));
      };

      // Reset form
      // setFormData({
      //   category_id: "",
      //   productName: "",
      //   description: "",
      //   has_variants: false,
      //   variants: [
      //     {
      //       productCategoryName: "",
      //       regularPrice: "",
      //       salePrice: "",
      //       weights: "",
      //       quantity: "",
      //       is_default: true,
      //     },
      //   ],
      // });
    } catch (error: any) {
      console.error("❌ Error submitting product:", error);
      setErrorMsg(
        error.response?.data?.error ||
          "Failed to submit product. Please try again."
      );
    }
  };

  return (
    <div className="body-root-inner">
      <div className="transection">
        <div className="vendor-list-main-wrapper product-wrapper add-product-page">
          <div className="card-body table-product-select">
            <div className="header-two show right-collups-add-product">
              <div className="flex justify-between">
                <div className="right-collups-area-top">
                  <h6 className="title" style={{ fontSize: "32px" }}>
                    Add New Product
                  </h6>
                  <p>Add information and add new product</p>
                  {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                </div>
                <div className="single-input">
                  {!formData.has_variants ? (
                    <button
                      type="button"
                      className="rts-btn btn-primary"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          has_variants: true,
                          variants: [
                            {
                              productCategoryName: "",
                              regularPrice: "",
                              salePrice: "",
                              weights: "",
                              quantity: "",
                              is_default: true,
                              image: null,
                            },
                          ],
                        }))
                      }
                    >
                      + Add Variants
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="rts-btn btn-danger bg-red-500 text-white"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          has_variants: false,
                          variants: [],
                        }))
                      }
                    >
                      ✕ Remove Variants
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="input-main-wrapper">
                {/* Product Name */}
                <div className="single-input">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    placeholder="Quaker Oats Healthy Meal..."
                    value={formData.productName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category */}
                <div className="single-input">
                  <label htmlFor="category_id">Category</label>
                  <select
                    id="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="border border-gray-300"
                  >
                    <option value="" className="border border-gray-300">
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.category_id} value={cat.category_id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Variants */}
                {formData.has_variants ? (
                  formData.variants.map((variant, index) => (
                    <div key={index} className="">
                      <div className="single-input">
                        <input
                          type="text"
                          placeholder="Variant Name"
                          value={variant.productCategoryName}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "productCategoryName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="single-input">
                        <input
                          type="number"
                          placeholder="Regular Price"
                          value={variant.regularPrice}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "regularPrice",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="single-input">
                        <input
                          type="number"
                          placeholder="Sale Price"
                          value={variant.salePrice}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "salePrice",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="single-input">
                        <input
                          type="text"
                          placeholder="Weight (e.g. 1kg)"
                          value={variant.weights}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "weights",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="single-input">
                        <input
                          type="number"
                          placeholder="Quantity"
                          value={variant.quantity}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "quantity",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="single-input">
                          <input
                            type="number"
                            id="regularPrice"
                            placeholder="Regular Price"
                            value={formData.regularPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="single-input">
                          <input
                            type="number"
                            id="salePrice"
                            placeholder="Sale Price"
                            value={formData.salePrice}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="single-input">
                          <input
                            type="text"
                            id="weights"
                            placeholder="Weight (e.g. 500g)"
                            value={formData.weights}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="single-input">
                          <input
                            type="number"
                            id="quantity"
                            placeholder="Quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                          />
                        </div>
                  </>
                )}

                {/* Description */}
                <div className="single-input">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    placeholder="Type something"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit */}
                <div className="button-area-botton-wrapper-p-list">
                  <button type="submit" className="rts-btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="rts-btn btn-primary bg-transparent"
                    onClick={() => window.history.back()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
