import { create_choice } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { getErrorMessage } from "@/lib/utils";
import { Choice } from "@prisma/client";

const useCreateChoice = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["column_choices", columnId];

  return useMutation({
    mutationFn: create_choice,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<Choice[]>(queryKey, (oldData) => {
        if (!oldData) return;

        return [...oldData, data.data];
      });

      toast({
        title: "Success",
        description: data.message,
      });
    },
    onError: (error) => {
      console.log(error);

      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useCreateChoice;
