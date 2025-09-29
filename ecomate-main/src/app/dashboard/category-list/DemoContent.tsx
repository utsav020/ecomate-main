"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Image from "next/image";
import AddEditCategoryPage from "../category-add/DemoContext";
import { API_BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Category {
  category_id: number;
  categoryName: string;
  created_at: string;
  updated_at: string;
}

interface CategoryDetail {
  category_id: number;
  categoryName: string;
  description?: string;
  image?: string;
}

const CategoryDashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Category[]>([]);
  const [viewCategory, setViewCategory] = useState<CategoryDetail | null>(null);
  const router = useRouter();
  // ✅ Add/Edit Form
  const [showForm, setShowForm] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // ✅ Fetch categories list
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/categories/getallcategory`
      );
      if (res.data && Array.isArray(res.data)) {
        setCategories(res.data);
      } else if (res.data && Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Handlers
  const handleView = async (id: number) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getcategorybyid/${id}`);
      setViewCategory({
        category_id: res.data.category_id,
        categoryName: res.data.categoryName,
        description: res.data.description,
        image: res.data.image,
      });
    } catch (err) {
      console.error("Error fetching category details:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/deletecategory/${id}`);
      setCategories(categories.filter((c) => c.category_id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id: number) => {
    setSelectedCategoryId(id);
    setShowForm(true);
  };

  const handleAddNew = () => {
    
  };

  const columns: TableColumn<Category>[] = [
    {
      name: "ID",
      selector: (row) => row.category_id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Category Name",
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      cell: (row) => <p>{new Date(row.created_at).toLocaleDateString()}</p>,
      sortable: true,
    },
    {
      name: "Updated At",
      selector: (row) => row.updated_at,
      cell: (row) => <p>{new Date(row.updated_at).toLocaleDateString()}</p>,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row.category_id)}
            className="bg-blue-500 text-black p-2 rounded"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleEdit(row.category_id)}
            className="bg-yellow-500 text-black p-2 rounded"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row.category_id)}
            className="bg-red-500 text-black p-2 rounded"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const filteredItems = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="body-root-inner p-6">
      {/* Header */}
      <div className="title-right-actioin-btn-wrapper-product-list">
        <h3 className="title">Categories</h3>
        <div className="button-wrapper">
          <button className="rts-btn btn-primary" 
             onClick={() => router.push("/dashboard/product-add")}>
            + Add Product
          </button>
        </div>
      </div>

      {/* Search & Count */}
      <div className="product-top-filter-area-l">
        <div className="left-area-button-fiulter">
          <div className="signle-product-single-button">
            <span>All {categories.length}</span>
          </div>
          <div className="signle-product-single-button">
            <span>
              New Item{" "}
              {categories.filter((c) => c.categoryName.includes("New")).length}
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

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredItems}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) =>
          setSelectedRows(selectedRows)
        }
        pagination
        paginationPerPage={rowsPerPage}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        noDataComponent="No categories found"
        highlightOnHover
        responsive
      />

      {/* ✅ Add/Edit Category Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <AddEditCategoryPage
            categoryId={selectedCategoryId?.toString() || undefined}
            onClose={() => setShowForm(false)}
            onSaved={() => {
              setShowForm(false);
              fetchCategories();
            }}
          />
        </div>
      )}

      {/* ✅ View Category Modal */}
      {viewCategory && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white p-6 rounded-xl max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{viewCategory.categoryName}</h2>
              <button onClick={() => setViewCategory(null)}>Close</button>
            </div>
            {viewCategory.image && (
              <div className="mb-4">
                <Image
                  src={viewCategory.image}
                  alt={viewCategory.categoryName}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            )}
            <p>
              <strong>ID:</strong> {viewCategory.category_id}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {viewCategory.description || "No description"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDashboard;
