"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";

const AddProductPage = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    productName: "",
    regularPrice: "",
    salePrice: "",
    productSize: "Small",
    stock: "",
    sku: "",
    category: "",
    tag: "",
    description: "",
    image: null as File | null,
    previewImage: "/assets/images-dashboard/grocery/16.png",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "previewImage" && value) {
          formPayload.append(key, value as any);
        }
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/categories/addcategory`,
        formPayload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Product submitted successfully:", response.data);
      alert("Product submitted successfully!");

      // Reset form
      setFormData({
        productName: "",
        regularPrice: "",
        salePrice: "",
        productSize: "Small",
        stock: "",
        sku: "",
        category: "",
        tag: "",
        description: "",
        image: null,
        previewImage: "/assets/images-dashboard/grocery/16.png",
      });
    } catch (error: any) {
      console.error("❌ Error submitting product:", error);
      setErrorMsg("Failed to submit product. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      productName: "",
      regularPrice: "",
      salePrice: "",
      productSize: "Small",
      stock: "",
      sku: "",
      category: "",
      tag: "",
      description: "",
      image: null,
      previewImage: "/assets/images-dashboard/grocery/16.png",
    });
  };

  return (
    <div className="body-root-inner">
      <div className="transection">
        <div className="vendor-list-main-wrapper product-wrapper add-product-page">
          <div className="card-body table-product-select">
            <div className="header-two show right-collups-add-product">
              <div className="right-collups-area-top">
                <h6 className="title" style={{ fontSize: "32px" }}>
                  Add New Product
                </h6>
                <p>Add information and add new product</p>
                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
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

                {/* Regular Price */}
                <div className="single-input">
                  <label htmlFor="regularPrice">Regular Price</label>
                  <input
                    type="text"
                    id="regularPrice"
                    placeholder="240"
                    value={formData.regularPrice}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Sale Price */}
                <div className="single-input">
                  <label htmlFor="salePrice">Sale Price</label>
                  <input
                    type="text"
                    id="salePrice"
                    placeholder="$250"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Product Size */}
                <div className="single-input">
                  <label htmlFor="productSize">Size</label>
                  <select
                    id="productSize"
                    className="nice-select size"
                    value={formData.productSize}
                    onChange={handleInputChange}
                  >
                    <option value="Small">Small</option>
                    <option value="Large">Large</option>
                    <option value="XL Size">XL Size</option>
                    <option value="XXL Size">XXL Size</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="single-input">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="text"
                    id="stock"
                    placeholder="530"
                    value={formData.stock}
                    onChange={handleInputChange}
                  />
                </div>

                {/* SKU */}
                <div className="single-input">
                  <label htmlFor="sku">SKU</label>
                  <input
                    type="text"
                    id="sku"
                    placeholder="3245"
                    value={formData.sku}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category */}
                <div className="single-input">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    placeholder="Notebook"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Tag */}
                <div className="single-input">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    id="tag"
                    placeholder="Iphone, Mobile"
                    value={formData.tag}
                    onChange={handleInputChange}
                  />
                </div>

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

                {/* Image Upload */}
                <div className="single-input">
                  <div className="file-upload-add-product">
                    <div className="profile-left">
                      <div className="profile-image mb--30">
                        <Image
                          src={formData.previewImage}
                          alt="Product Preview"
                          width={100}
                          height={100}
                        />
                        <span>Drag and drop Image</span>
                      </div>
                      <div className="button-area">
                        <div className="brows-file-wrapper">
                          <input
                            id="rts_images1"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <label
                            htmlFor="rts_images1"
                            className="rts-btn btn-primary opacity-none"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="button-area-botton-wrapper-p-list">
                  <button type="submit" className="rts-btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="rts-btn btn-primary bg-transparent"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-copyright">
        <div className="left">
          <p>Copyright © 2024 All Right Reserved.</p>
        </div>
        <ul>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AddProductPage;
