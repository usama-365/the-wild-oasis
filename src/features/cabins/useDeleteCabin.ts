import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabinFromSupabase } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinFromSupabase,
    onSuccess: () => {
      toast.success("Cabin deleted successfully!");
      void queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { isDeleting, deleteCabin };
}
