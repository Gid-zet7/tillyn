"use client";

import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
