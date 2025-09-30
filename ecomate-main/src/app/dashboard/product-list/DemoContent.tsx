'use client';

import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import router from "next/router";
import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

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

interface TableRow {
  id: string; // unique id for DataTable
  name: string;
  regularPrice: string | number | null;
  salePrice: string | number | null;
  quantity: string | number | null;
  categoryId: number;
  isVariant: boolean;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterText, setFilterText] = useState("");

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/product/getallproducts`);
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Transform products + variants into a flat array for DataTable
  const getTableData = (): TableRow[] => {
    const rows: TableRow[] = [];

    products.forEach((p) => {
      // Main product row
      rows.push({
        id: `p-${p.product_id}`,
        name: p.productName,
        regularPrice: p.regularPrice,
        salePrice: p.salePrice,
        quantity: p.quantity,
        categoryId: p.category_id,
        isVariant: false,
      });

      // Add variants as rows if any
      if (p.has_variants && p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          rows.push({
            id: `v-${v.product_category_id}`,
            name: `↳ ${v.productCategoryName}`, // indent with arrow
            regularPrice: v.regularPrice,
            salePrice: v.salePrice,
            quantity: v.quantity,
            categoryId: p.category_id,
            isVariant: true,
          });
        });
      }
    });

    return rows;
  };

  const tableData = getTableData();

  const columns: TableColumn<TableRow>[] = [
    {
      name: "Product / Variant",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <span className={row.isVariant ? "text-gray-600 ml-4" : ""}>
          {row.name}
        </span>
      ),
    },
    {
      name: "Regular Price",
      selector: (row) => row.regularPrice ?? "-",
      sortable: true,
      cell: (row) => row.regularPrice ?? "-",
    },
    {
      name: "Sale Price",
      selector: (row) => row.salePrice ?? "-",
      sortable: true,
      cell: (row) => row.salePrice ?? "-",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity ?? "-",
      sortable: true,
      cell: (row) => row.quantity ?? "-",
    },
    {
      name: "Category ID",
      selector: (row) => row.categoryId,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button className="bg-blue-500 p-2 rounded"><Eye /></button>
          <button className="bg-yellow-500 p-2 rounded"><SquarePen /></button>
          <button className="bg-red-500 p-2 rounded"><Trash2 /></button>
        </div>
      ),
    },
  ];

  const filteredItems = tableData.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      (item.regularPrice ?? "").toString().toLowerCase().includes(filterText.toLowerCase()) ||
      (item.salePrice ?? "").toString().toLowerCase().includes(filterText.toLowerCase()) ||
      (item.quantity ?? "").toString().toLowerCase().includes(filterText.toLowerCase())
  );

  return (  
    <div className="p-4">
      {/* Header */}
      <div className="title-right-actioin-btn-wrapper-product-list">
        <h3 className="title">Categories</h3>
        <div className="button-wrapper">
          <button
            className="rts-btn btn-primary"
            onClick={() => router.push("/dashboard/category-add")}
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Search & Count */}
      <div className="product-top-filter-area-l">
        <div className="left-area-button-fiulter">
          <div className="signle-product-single-button">
            <span>All {products.length}</span>
          </div>
          <div className="signle-product-single-button">
            <span>
              New Item{" "}
              {products.filter((c) => c.productName.includes("New")).length}
            </span>
          </div>
        </div>
        <div className="right-area-search">
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        highlightOnHover
        pointerOnHover
        noDataComponent="No products found"
      />
    </div>
  );
};

export default ProductTable;
