import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback
} from "react";
import { LocalStorageService, LS_KEYS } from "../services/localStorage";

const AvatarContext = createContext(null);

function AvatarProvider({ children }) {
  const [avatar, setAvatar] = useState(
    LocalStorageService.get(LS_KEYS.AVATAR) || null
  );

  const changeAvatar = useCallback((newAvatar) => {
    setAvatar(newAvatar);
    LocalStorageService.set(LS_KEYS.AVATAR, newAvatar);
  }, []);

  const removeAvatar = useCallback(() => {
    setAvatar(null);
    LocalStorageService.remove(LS_KEYS.AVATAR);
  }, []);

  const value = useMemo(
    () => ({ avatar, changeAvatar, removeAvatar }),
    [avatar, changeAvatar, removeAvatar]
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
