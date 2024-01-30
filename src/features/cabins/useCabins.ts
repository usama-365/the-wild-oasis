import { useQuery } from "@tanstack/react-query";
import { getAllCabinsFromSupabase } from "../../services/apiCabins.ts";

export default function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabinsFromSupabase,
  });

  return { isLoading, cabins };
}
