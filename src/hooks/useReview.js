import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsService,
  createReviewService,
  updateReviewService,
  deleteReviewService,
} from "../services/reviewService"; 
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";


export const useReviews = (itemId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reviews", itemId], // Unique key for this item's reviews
    queryFn: () => getReviewsService(itemId),
    enabled: !!itemId, // Only run the query if itemId is available
  });

  return {
    reviews: data?.data || [],
    isLoading,
    error,
  };
};


export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (reviewData) => createReviewService(reviewData, token),
    onSuccess: (data, variables) => {
      toast.success(data?.message || "Review submitted successfully!");
      
      queryClient.invalidateQueries({ queryKey: ["reviews", variables.item_id] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to submit review.");
    },
  });
};


export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ reviewId, reviewData }) => updateReviewService(reviewId, reviewData, token),
    onSuccess: (data, variables) => {
        toast.success(data?.message || "Review updated successfully!");
        
        if (variables.item_id) {
            queryClient.invalidateQueries({ queryKey: ["reviews", variables.item_id] });
        }
    },
    onError: (error) => {
        toast.error(error?.message || "Failed to update review.");
    }
  });
};


export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    const { token } = useContext(AuthContext);

    return useMutation({
        mutationFn: (reviewId) => deleteReviewService(reviewId, token),
        onSuccess: (data, variables) => {
            toast.success(data?.message || "Review deleted successfully!");
            if (variables.item_id) {
                queryClient.invalidateQueries({ queryKey: ["reviews", variables.item_id] });
            }
        },
        onError: (error) => {
            toast.error(error?.message || "Failed to delete review.");
        }
    });
};
