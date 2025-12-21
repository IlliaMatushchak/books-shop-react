import { createContext, useContext, useMemo, useCallback } from "react";
import { useAuth } from "./AuthContext";
import useControlledFetch from "../hooks/useControlledFetch";
import { ProfileService } from "../services/profileService";

const AvatarContext = createContext(null);

function AvatarProvider({ children }) {
  const { user, updateAvatar: updateUserAvatar } = useAuth();
  const avatar = user?.avatar;
  const { loading, error, fetch: fetchAvatar } = useControlledFetch();

  const updateAvatar = useCallback(
    (newAvatar) => {
      fetchAvatar({
        requestFn: ProfileService.updateAvatar,
        args: [newAvatar],
        onSuccess: (data) => {
          if (!data?.avatar) return;
          updateUserAvatar(data.avatar);
        },
      });
    },
    [fetchAvatar, updateUserAvatar]
  );

  const deleteAvatar = useCallback(() => {
    fetchAvatar({
      requestFn: ProfileService.deleteAvatar,
      onSuccess: () => updateUserAvatar(null),
    });
  }, [fetchAvatar, updateUserAvatar]);

  const value = useMemo(
    () => ({ avatar, loading, error, updateAvatar, deleteAvatar }),
    [avatar, loading, error, updateAvatar, deleteAvatar]
  );

  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
}

function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatar must be used within an AvatarProvider");
  }
  return context;
}

export { AvatarProvider, useAvatar };
