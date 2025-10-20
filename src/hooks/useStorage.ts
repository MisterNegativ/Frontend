import AsyncStorage from '@react-native-async-storage/async-storage';

export const useStorage = () => {
  const getItem = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const setItem = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage error:', error);
    }
  };

  return { getItem, setItem };
};