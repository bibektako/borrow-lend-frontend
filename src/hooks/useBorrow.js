import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBorrowRequestService,
  getBorrowRequestsService,
  updateBorrowRequestService,
} from "../services/borrowService";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";

export const useBorrowRequests = () => {
  const { token } = useContext(AuthContext);
  const { data, isLoading, error, isError, refetch} = useQuery({
    queryKey: ["borrow-requests"],
    queryFn: () => getBorrowRequestsService(token),
    enabled: !!token,
  });
  return {
    requests: data?.data || [],
    isLoading,
    error,
    isError,
    refetch
  };
};

export const useCreateBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (itemId) => createBorrowRequestService(itemId, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Borrow request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["item"] });
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to send borrow request.");
    },
  });
};

export const useUpdateBorrowRequest = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: ({ requestId, status }) =>
      updateBorrowRequestService(requestId, status, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Request updated!");
      queryClient.invalidateQueries({ queryKey: ["borrow-requests"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update request.");
    },
  });
};
