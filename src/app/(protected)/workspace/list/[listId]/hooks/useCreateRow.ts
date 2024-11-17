import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { create_row } from "@/server/actions/list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePage } from "./usePage";
import { TListResponse } from "@/lib/types";

const useCreateRow = (listId: string) => {
  const { page } = usePage();
  const queryClient = useQueryClient();
  const queryKey = ["data_table", listId, page];

  return useMutation({
    mutationFn: create_row,
    onSuccess: async (data) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TListResponse>(queryKey, (oldData) => {
        if (!oldData) return;

        const newData = [data.data, ...oldData.data.slice(0, 9)];

        return {
          data: newData,
          hasNextPage: newData.length >= 10 ? true : oldData.hasNextPage,
        };
      });

      toast({
        title: "Success",
        description: data.message,
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

export default useCreateRow;
