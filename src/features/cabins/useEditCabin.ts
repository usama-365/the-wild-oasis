import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CabinFormUpdateData,
  updateCabinOnSupabase,
} from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ cabin, id }: { cabin: CabinFormUpdateData; id: number }) =>
      updateCabinOnSupabase(cabin, id),
    onSuccess: () => {
      toast.success("New cabin successfully updated!");
      void queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      let message = "Something went wrong in updating the cabin.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
  return { updateCabin, isUpdating };
}
