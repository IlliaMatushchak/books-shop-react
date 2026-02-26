import { LS_KEYS } from "../../constants/storageKeys";

class LocalStorageService {
  static get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key [${key}]`, error);
      return null;
    }
  }

  static getRaw(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting localStorage key [${key}]`, error);
      return null;
    }
  }

  static set(key, value) {
    try {
      const data = typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  static removeAll() {
    try {
      Object.values(LS_KEYS).forEach((key) => localStorage.removeItem(key));
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}

export { LocalStorageService, LS_KEYS };
