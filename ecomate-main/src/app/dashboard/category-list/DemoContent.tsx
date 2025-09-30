"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import AddEditCategoryPage from "../category-add/DemoContext";
import { API_BASE_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { X, SquarePen, Eye, Trash2 } from "lucide-react";

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
      const res = await axios.get(
        `${API_BASE_URL}/api/categories/getcategorybyid/${id}`
      );
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
      await axios.delete(`${API_BASE_URL}/api/categories/deletecategory/${id}`);
      setCategories(categories.filter((c) => c.category_id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id: number) => {
    setSelectedCategoryId(id);
    setShowForm(true);
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
      selector: (row) => row.updated_at,
      cell: (row) => (
        <div className="flex">
          <button
            onClick={() => handleView(row.category_id)}
            className="bg-blue-500 text-blue-500 p-2 rounded"
          >
            <Eye className="text-gray-600" />
          </button>
          <button
            onClick={() => handleEdit(row.category_id)}
            className="bg-yellow-500 text-green-600 p-2 rounded"
          >
            <SquarePen className="text-green-500" />
          </button>
          <button
            onClick={() => handleDelete(row.category_id)}
            className="bg-red-500 text-black p-2 rounded"
          >
            <Trash2 className="text-red-400" />
          </button>
        </div>
      ),
      sortable: true,
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-auto transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="">
              <h3 className="text-[20px] pt-3 text-center text-gray-500 mt-1">
                Category Details
              </h3>
            </div>
            <div className="flex w-full justify-between p-6 pb-0 pt-0 border-b border-gray-100">
              <div className="flex w-full space-x-3">
                <div className="flex gap-3 h-auto ">
                  <div className="bg-blue-100 mt-3 p-2 h-[30px] rounded-lg">
                    <svg
                      className="w-7 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {viewCategory.categoryName}
                    </h3>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setViewCategory(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
                >
                  <X />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Category Image */}
              {viewCategory.image && (
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                    {/* <Image
                      src={viewCategory.image}
                      alt={viewCategory.categoryName}
                      fill
                      className="object-cover"
                    /> */}
                  </div>
                </div>
              )}

              {/* Information Cards */}
              <div className="grid gap-4">
                {/* ID Card */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-md font-semibold text-blue-700">
                      CATEGORY ID
                    </span>
                  </div>
                  <p className="text-2xl font-mono text-blue-900 bg-white/50 py-1 px-3 rounded-lg border border-blue-200">
                    {viewCategory.category_id}
                  </p>
                </div>

                {/* Description Card */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-md font-semibold text-gray-700">
                      DESCRIPTION
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed bg-white/50 py-2 px-3 rounded-lg border border-gray-200 min-h-[60px]">
                    {viewCategory.description || (
                      <span className="text-gray-400 italic">
                        No description provided
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-3xl font-bold text-green-700">12</div>
                  <div className="text-md text-green-600 font-medium">
                    Products
                  </div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-3xl font-bold text-purple-700">3</div>
                  <div className="text-md text-purple-600 font-medium">
                    Subcategories
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-start space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <div className="button-area-botton-wrapper-p-list">
                <button
                  onClick={() => setViewCategory(null)}
                  className="rts-btn btn-primary"
                >
                  Close
                </button>
              </div>
              <div className="button-area-botton-wrapper-p-list">
                <button
                  className="rts-btn btn-primary bg-transparent"
                  onClick={() => {
                    setViewCategory(null); // ✅ Close details modal
                    handleEdit(viewCategory.category_id); // ✅ Open edit modal
                  }}
                >
                  Edit Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDashboard;
