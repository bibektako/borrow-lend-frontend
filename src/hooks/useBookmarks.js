import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../auth/Authprovider';
import { toast } from 'react-hot-toast';

import {
  getBookmarksApi,
  addBookmarkApi,
  removeBookmarkApi,
} from '../api/authAPI'; // Make sure this path is correct

export const useBookmarks = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['bookmarks', user?._id],
    queryFn: async () => {
      const response = await getBookmarksApi();
      return response.data.data; 
    },
    enabled: !!user,
  });

  const isBookmarked = (itemId) => {
    return bookmarks.some((bookmark) => bookmark._id === itemId);
  };

  const { mutate: toggleBookmark, isPending: isToggling } = useMutation({
    mutationFn: async ({ itemId, isCurrentlyBookmarked }) => {
      if (isCurrentlyBookmarked) {
        return removeBookmarkApi(itemId);
      } else {
        return addBookmarkApi(itemId);
      }
    },
    onSuccess: (response, variables) => {
      const message = variables.isCurrentlyBookmarked
        ? "Removed from wishlist"
        : "Added to wishlist";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ['bookmarks', user?._id] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Could not update wishlist.");
    },
  });

  const handleToggleBookmark = (itemId) => {
    const isCurrentlyBookmarked = isBookmarked(itemId);
    toggleBookmark({ itemId, isCurrentlyBookmarked });
  };

  return {
    bookmarks,
    isLoading,
    toggleBookmark: handleToggleBookmark, 
    isToggling,
    isBookmarked,
    bookmarkCount: bookmarks.length,
  };
};