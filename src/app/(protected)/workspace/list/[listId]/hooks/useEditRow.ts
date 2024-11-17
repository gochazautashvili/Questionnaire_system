import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { edit_row } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePage } from "./usePage";
import { TListResponse } from "@/lib/types";

const useEditRow = () => {
  const { page } = usePage();
  const listId = useListId();
  const queryClient = useQueryClient();
  const queryKey = ["data_table", listId, page];

  return useMutation({
    mutationFn: edit_row,
    onMutate: async (vars) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TListResponse>(queryKey);

      queryClient.setQueryData<TListResponse>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          hasNextPage: oldData.hasNextPage,
          data: oldData.data.map((old) => {
            if (old.id === vars.row.id) {
              return {
                ...old,
                id: old.id,
                listId: old.listId,
                [vars.columnId]: vars.value,
              };
            }

            return old;
          }),
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

export default useEditRow;
