import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUnverifiedItemsService,
  verifyItemService,
} from "../../services/admin/itemServiceAdmin";

import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../auth/Authprovider";

export const useUnverifiedItems = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["unverified_items"],
    queryFn: getUnverifiedItemsService,
  });

  return {
    unverifiedItems: data?.data || [],
    isLoading,
    error,
    isError,
  };
};

export const useVerifyItem = () => {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  return useMutation({
    mutationFn: (id) => verifyItemService(id, token),
    onSuccess: (data) => {
      toast.success(data?.message || "Item verified successfully!");
      // When an item is verified, invalidate the unverified items list
      // so it automatically refetches and the verified item disappears from the view.
      queryClient.invalidateQueries({ queryKey: ["unverified_items"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to verify item.");
    },
  });
};
