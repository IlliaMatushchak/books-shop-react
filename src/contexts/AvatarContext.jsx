import { createContext, useContext, useMemo, useCallback } from "react";
import { useAuth } from "./AuthContext";
import useControlledFetch from "../hooks/useControlledFetch";
import { ProfileService } from "../services/profileService";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const AvatarContext = createContext(null);

function AvatarProvider({ children }) {
  const { user, setUser } = useAuth();
  const avatar = user?.avatar;
  const { loading, error, fetch: fetchAvatar } = useControlledFetch();

  const updateAvatarState = useCallback(
    (newAvatar) => {
      if (!user) return;
      const updatedUser = { ...user, avatar: newAvatar };
      setUser(updatedUser);
      LocalStorageService.set(LS_KEYS.USER, updatedUser);
    },
    [user, setUser]
  );

  const updateAvatar = useCallback(
    (newAvatar) => {
      fetchAvatar({
        requestFn: ProfileService.updateAvatar,
        args: [newAvatar],
        onSuccess: ({ avatar }) => updateAvatarState(avatar),
      });
    },
    [fetchAvatar, updateAvatarState]
  );

  const deleteAvatar = useCallback(() => {
    fetchAvatar({
      requestFn: ProfileService.deleteAvatar,
      onSuccess: () => updateAvatarState(null),
    });
  }, [fetchAvatar, updateAvatarState]);

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
