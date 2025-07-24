import { useQuery } from "@tanstack/react-query";

import { getAllCategoryService } from "../services/admin/categoryService";


export const useCategories = () => {
  const {
    data: categoryData, // We get the raw response here, let's call it categoryData
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    
    queryFn: getAllCategoryService,
    
    staleTime: 1000 * 60 * 15,
  });

  const categories = categoryData?.data || [];

  return {
    categories, // The clean array of category objects
    isLoading,  // True while fetching
    isError,    // True if an error occurred
    error,      // The error object
  };
};