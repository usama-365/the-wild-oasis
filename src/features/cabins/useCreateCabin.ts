import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabinOnSupabase } from "../../services/apiCabins.ts";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinOnSupabase,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      void queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      let message = "Something went wrong in creating the cabin.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });

  return { createCabin, isCreating };
}
