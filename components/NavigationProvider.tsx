"use client";

import {
  createContext,
  useCallback,
  useContext,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import NavigationOverlay from "@/components/reusable/NavigationOverlay";

interface NavigationContextValue {
  navigate: (href: string) => void;
  isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isNavigating, startTransition] = useTransition();

  const navigate = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router],
  );

  return (
    <NavigationContext.Provider value={{ navigate, isNavigating }}>
      {children}
      {isNavigating && <NavigationOverlay />}
    </NavigationContext.Provider>
  );
}
