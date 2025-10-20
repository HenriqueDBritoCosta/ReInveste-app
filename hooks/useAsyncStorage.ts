//kooks/useAsyncStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useAsyncStorageNumber(key: string, initial = 0) {
  const [value, setValue] = useState<number>(initial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key).then(v => {
      if (v !== null) setValue(Number(v));
      setLoading(false);
    });
  }, [key]);

  const save = useCallback(
    async (next: number) => {
      setValue(next);
      await AsyncStorage.setItem(key, String(next));
    },
    [key]
  );

  return { value, setValue: save, loading };
}
