// // src/services/categoryService.ts
// import axios from "axios";
// import { API_BASE_URL } from "@/lib/api";

// export interface Category {
//   image: any;
//   id?: number;
//   categoryName: string;
//   description?: string;
// }

// export const getAllCategories = async () => {
//   const res = await axios.get(`${API_BASE_URL}/api/categories/getallcategory`);
//   return res.data;
// };

// export const getCategoryById = async (id: number) => {
//   const res = await axios.get(`${API_BASE_URL}/api/categories/getcategorybyid/2 `);
//   return res.data;
// };

// export const addCategory = async (category: Category) => {
//   const res = await axios.post(`${API_BASE_URL}/api/categories/addcategory`, category);
//   return res.data;
// };

// export const updateCategory = async (id: number, category: Category) => {
//   const res = await axios.put(`${API_BASE_URL}/api/categories/updatecategory/${id}`, category);
//   return res.data;
// };
// export const deleteCategory = async (id: number) => {
//   const res = await axios.delete(`${API_BASE_URL}/api/categories/deletecategory/${id}`);
//   return res.data;
// }