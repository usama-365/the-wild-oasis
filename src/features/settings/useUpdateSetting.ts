import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettingOnSupabase } from "../../services/apiSettings.ts";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingOnSupabase,
    onSuccess: () => {
      toast.success("Setting successfully updated!");
      void queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      let message = "Something went wrong in updating the setting.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });

  return { isUpdating, updateSetting };
}
