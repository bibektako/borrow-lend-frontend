import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import{
    getAllCategoryService,
    updateCategoryService,
    deleteCategoryService,
    createCategoryService
}from "../../services/admin/categoryService";

import { toast } from "react-toastify";

export const useAdminCategory = ()=>{
    const query = useQuery(
        {
            queryKey: ["admin_category"],
            queryFn: ()=> getAllCategoryService()
        }
    )
    const categories = query.data?.data || []
    return {
        ...query,
        categories
    }
}
export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationKey:
                ["admin_create_category"],
            mutationFn:
                createCategoryService,
            onSuccess: () => {
                queryClient
                    .invalidateQueries(
                        "admin_category"
                    )  // refetch get query
            }
        }
    )
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: ({id, data}) => updateCategoryService(id, data),
            mutationKey: ["admin_category_update"],
            onSuccess: () => {
                toast.success("Updated")
                queryClient.invalidateQueries(
                    ["admin_category", "admin_category_detail"]
                )
            },
            onError: (err)=> {
                toast.error(err.message || "Update failed")
            }
        }
    )
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation(
        {
            mutationFn: deleteCategoryService,
            mutationKey: ["admin_category_delete"],
            onSuccess: () => {
                toast.success("Deleted")
                queryClient.invalidateQueries(["admin_category"])
            },
            onError: (err)=> {
                toast.error(err.message || "Delete Failed")
            }
        }
    )
}