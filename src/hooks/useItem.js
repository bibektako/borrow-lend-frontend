import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getItemsService,
  getItemByIdService,
  getMyItemsService,
  createItemService,
  updateItemService,
  deleteItemService,
} from "../services/itemService";
import { getAllCategoryService } from "../services/admin/categoryService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";

export const useItems = (filters = {}) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["items", filters],
    queryFn: () => getItemsService(filters),
  });

  return {
    items: data?.data || [],
    isLoading,
    error,
    isError,
  };
};

export const useMyItems = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["my-items"],
    queryFn: getMyItemsService,
  });
  return {
    items: data?.data || [],
    isLoading,
    error,
    isError,
  };
};
export const useCategories = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategoryService,
    });
    return {
        categories: data?.data?.categories || [],
        isLoadingCategories: isLoading,
        errorCategories: error,
    };
};

export const useItemById = (id) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemByIdService(id),
    enabled: !!id,
  });

  return {
    item: data?.data || null,
    isLoading,
    error,
    isError,
  };
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (formData) => createItemService(formData, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Item created successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create item.");
    },
  });
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ id, formData }) => updateItemService(id, formData, token),
    onSuccess: (data, variables) => {
      toast.success(data?.message || "Item updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item", variables.id] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update item.");
    },
  });
};

export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (id) => deleteItemService(id, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Item deleted successfully!");

      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete item.");
    },
  });
};
