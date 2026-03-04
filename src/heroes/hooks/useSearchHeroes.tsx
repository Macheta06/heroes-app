import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "../actions/search-heros.actions";

export const useSearch = (name: string, strength: string) => {
  return useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });
};
