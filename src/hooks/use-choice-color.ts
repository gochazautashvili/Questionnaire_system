import { edit_choice_color } from "@/server/actions/list";
import { Choice } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { getErrorMessage } from "@/lib/utils";

const useChoiceColor = (columnId: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["column_choices", columnId];

  return useMutation({
    mutationFn: edit_choice_color,
    onMutate: async ({ choiceId, color }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<Choice[]>(queryKey);

      queryClient.setQueryData<Choice[]>(queryKey, (oldData) => {
        if (!oldData) return;

        return oldData.map((old) => {
          if (old.id === choiceId) {
            return { ...old, color };
          }

          return old;
        });
      });

      return { prevData };
    },
    onError(error, _, context) {
      queryClient.setQueryData<Choice[]>(queryKey, context?.prevData);

      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useChoiceColor;
