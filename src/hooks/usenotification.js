import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBorrowRequestService,
  getBorrowRequestsService,
  updateBorrowRequestService,
} from "../services/borrowService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";

/**
 * Fetches all incoming and outgoing borrow requests for the logged-in user.
 */
export const useBorrowRequests = () => {
  const { token } = useContext(AuthContext);
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["borrow-requests"],
    queryFn: () => getBorrowRequestsService(token),
    enabled: !!token, // Only run the query if the user is logged in
  });

  return {
    requests: data?.data || [],
    isLoading,
    error,
    isError,
    refetch,
  };
};

/**
 * Provides a mutation function to create a new borrow request.
 */
export const useCreateBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (itemId) => createBorrowRequestService(itemId, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Borrow request sent successfully!");
      // Invalidate related queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send borrow request.");
    },
  });
};

/**
 * Provides a mutation function to update a borrow request's status
 * with INSTANT UI feedback (Optimistic Update).
 */
export const useUpdateBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ requestId, status }) =>
      updateBorrowRequestService(requestId, status, token),

    // This runs immediately on mutation, BEFORE the API call
    onMutate: async ({ requestId, status: newStatus }) => {
      // Cancel any ongoing refetches to prevent conflicts
      await queryClient.cancelQueries({ queryKey: ["borrow-requests"] });

      // Snapshot the previous state of the data
      const previousRequestsData = queryClient.getQueryData(["borrow-requests"]);

      // Optimistically update the cache
      queryClient.setQueryData(["borrow-requests"], (oldData) => {
        if (!oldData || !oldData.data) return oldData;
        const updatedRequests = oldData.data.map((request) =>
          request._id === requestId
            ? { ...request, status: newStatus } // Instantly change the status
            : request
        );
        return { ...oldData, data: updatedRequests };
      });

      // Return the snapshot to be used in case of an error
      return { previousRequestsData };
    },

    // If the API call fails, roll back to the snapshotted data
    onError: (error, variables, context) => {
      if (context?.previousRequestsData) {
        queryClient.setQueryData(["borrow-requests"], context.previousRequestsData);
      }
      toast.error(error?.message || "Action failed. Reverting change.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['item'] });
    },
  });
};