import {
  getAllCategoriesApi,
  updateCategoryApi,
  deleteCategoryApi,
  createCategoryApi,
} from "../../api/admin/categoryAPI";

export const getAllCategoryService = async () => {
    try {
        const response = await getAllCategoriesApi()
        return response.data
    } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch'}
    }
}
export const createCategoryService = async (data) => {
    try{
        const response = await createCategoryApi(data)
        return response.data
    }catch(err){
        throw err.response?.data || { message: 'Failed to create'}
    }
}


export const updateCategoryService = async (id, data) => {
    try{
        const response = await updateCategoryApi(id, data)
        return response.data
    }catch(err){
        throw err.response?.data || { message: 'Failed to update'}
    }
}
export const deleteCategoryService = async (id) => {
    try{
        const response = await deleteCategoryApi(id)
        return response.data
    }catch(err){
        throw err.response?.data || { message: 'Failed to delete'}
    }
}
