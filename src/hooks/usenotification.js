import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";
import { toast } from "react-hot-toast";

import {
  getNotificationsService,
  markNotificationsAsReadService,
} from "../services/notificationService";

export const useNotifications = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  console.log("Checking user object in useNotifications:", user);

  const { data, isLoading } = useQuery({
    queryKey: ["notifications", user?._id],
    queryFn: () => {
            // Add a log right before the service is called
            console.log('[HOOK] Query is enabled, attempting to call getNotificationsService...');
            return getNotificationsService();
        },
    enabled: !!user,
    refetchInterval: 120000,
  });
  console.log("Data received from getNotificationsService:", data);

  const notifications = Array.isArray(data) ? data : [];

  console.log("Processed 'notifications' array:", notifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const { mutate: markAsRead, isPending: isMarkingAsRead } = useMutation({
    mutationFn: markNotificationsAsReadService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?._id] });
    },
    onError: (error) => {
      toast.error(error.message || "Could not update notifications.");
    },
  });

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    isMarkingAsRead,
  };
};
