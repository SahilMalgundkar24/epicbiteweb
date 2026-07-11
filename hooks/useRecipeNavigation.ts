"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useNavigation } from "@/components/NavigationProvider";

export function useRecipeNavigation() {
  const { navigate, isNavigating } = useNavigation();
  const pathname = usePathname();
  const [navigatingTo, setNavigatingTo] = useState<number | null>(null);

  useEffect(() => {
    setNavigatingTo(null);
  }, [pathname]);

  const navigateToRecipe = useCallback(
    (id: number) => {
      setNavigatingTo(id);
      navigate(`/recipes/${id}`);
    },
    [navigate],
  );

  return { navigateToRecipe, isNavigating, navigatingTo };
}
