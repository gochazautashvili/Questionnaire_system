import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { TListResponse } from "@/lib/types";
import { getErrorMessage } from "@/lib/utils";
import { delete_row } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePage } from "./usePage";

const useDeleteRow = () => {
  const { page } = usePage();
  const listId = useListId();
  const queryClient = useQueryClient();
  const queryKey = ["data_table", listId, page];

  return useMutation({
    mutationFn: delete_row,
    onSuccess: async (_, rowId) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TListResponse>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          data: oldData.data.filter((old) => old.id !== rowId),
          hasNextPage: oldData.hasNextPage,
        };
      });
    },
    onError(error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useDeleteRow;
