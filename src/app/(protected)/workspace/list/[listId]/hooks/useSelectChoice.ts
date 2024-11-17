import { TListResponse } from "@/lib/types";
import { select_choice } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePage } from "./usePage";
import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";

const useSelectChoice = () => {
  const { page } = usePage();
  const listId = useListId();
  const queryClient = useQueryClient();
  const queryKey = ["data_table", listId, page];

  return useMutation({
    mutationFn: select_choice,
    onMutate: async ({ choiceId, columnId, row }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TListResponse>(queryKey);

      queryClient.setQueryData<TListResponse>(queryKey, (oldData) => {
        if (!oldData) return;

        const newRow = { ...row, [columnId]: choiceId };

        return {
          data: oldData.data.map((old) => {
            if (old.id === row.id) {
              return newRow;
            }

            return old;
          }),
          hasNextPage: oldData.hasNextPage,
        };
      });

      return { prevData };
    },
    onError(error, _, context) {
      queryClient.setQueryData<TListResponse>(queryKey, context?.prevData);

      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useSelectChoice;
