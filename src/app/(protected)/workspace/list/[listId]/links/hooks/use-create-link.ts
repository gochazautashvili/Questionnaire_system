import useListId from "@/hooks/use-listId";
import { create_link } from "@/server/actions/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFormLinks } from "../_components/data-table";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";

const useCreateLink = () => {
  const listId = useListId();
  const queryKey = ["list_form_links", listId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create_link,
    onSuccess: async ({ data, message }) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TFormLinks>(queryKey, (oldData) => {
        if (!oldData) return;

        return { ...oldData, links: [data, ...oldData.links] };
      });

      toast({
        title: "Success",
        description: message,
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

export default useCreateLink;
