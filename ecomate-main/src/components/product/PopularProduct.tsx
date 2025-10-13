"use client"; // optional, for client-side code
import React, { useEffect, useState } from "react";
import PopularProductMain from "@/components/product-main/PopularProductMain";

interface PostType {
  category?: string;
  slug: string;
  image: string;
  title?: string;
  author?: string;
  price?: string;
  publishedDate?: string;
}

const MyComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab1");
  const [activeModal, setActiveModal] = useState<
    "one" | "two" | "three" | null
  >(null);
  const [products, setProducts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://ekomart-backend.onrender.com/api/product/getallproducts"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClose = () => setActiveModal(null);

  const selectedPosts = products.slice(1, 11);

  const postIndicesSection1 = [12, 5, 6, 4];
  const postIndicesSection2 = [5, 6, 4, 7];
  const postIndicesSection3 = [3, 2, 1, 5];
  const postIndicesSection4 = [8, 11, 12, 16];

  const getPostsByIndices = (indices: number[]): PostType[] =>
    indices.map((index) => products[index]).filter(Boolean);

  const postsSection1 = getPostsByIndices(postIndicesSection1);
  const postsSection2 = getPostsByIndices(postIndicesSection2);
  const postsSection3 = getPostsByIndices(postIndicesSection3);
  const postsSection4 = getPostsByIndices(postIndicesSection4);

  return (
    <div>
      <div className="popular-product-weekly-seller-item rts-section-gap bg_light-1">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-area-between">
                <h2 className="title-left mb--0">Popular Products</h2>
                <ul className="nav nav-tabs" id="myTabx" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setActiveTab("tab1")}
                      className={`nav-link ${
                        activeTab === "tab1" ? "active" : ""
                      }`}
                    >
                      Frozen Foods
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setActiveTab("tab2")}
                      className={`nav-link ${
                        activeTab === "tab2" ? "active" : ""
                      }`}
                    >
                      Diet Foods
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setActiveTab("tab3")}
                      className={`nav-link ${
                        activeTab === "tab3" ? "active" : ""
                      }`}
                    >
                      Healthy Foods
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setActiveTab("tab4")}
                      className={`nav-link ${
                        activeTab === "tab4" ? "active" : ""
                      }`}
                    >
                      Vitamin Items
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-12">
              {activeTab === "tab1" && (
                <div>
                  <div className="row g-4">
                    {postsSection1.map((post: PostType, index: number) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6 col-12"
                      >
                        <div className="single-shopping-card-one">
                          <PopularProductMain
                            Slug={post.slug}
                            ProductImage={post.image}
                            ProductTitle={post.title}
                            Price={post.price}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "tab2" && (
                <div>
                  <div className="row g-4">
                    {postsSection2.map((post: PostType, index: number) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6 col-12"
                      >
                        <div className="single-shopping-card-one">
                          <PopularProductMain
                            Slug={post.slug}
                            ProductImage={post.image}
                            ProductTitle={post.title}
                            Price={post.price}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "tab3" && (
                <div>
                  <div className="row g-4">
                    {postsSection3.map((post: PostType, index: number) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6 col-12"
                      >
                        <div className="single-shopping-card-one">
                          <PopularProductMain
                            Slug={post.slug}
                            ProductImage={post.image}
                            ProductTitle={post.title}
                            Price={post.price}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "tab4" && (
                <div>
                  <div className="row g-4">
                    {postsSection4.map((post: PostType, index: number) => (
                      <div
                        key={index}
                        className="col-lg-3 col-md-6 col-sm-6 col-12"
                      >
                        <div className="single-shopping-card-one">
                          <PopularProductMain
                            Slug={post.slug}
                            ProductImage={post.image}
                            ProductTitle={post.title}
                            Price={post.price}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
