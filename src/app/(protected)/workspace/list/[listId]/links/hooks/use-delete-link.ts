import useListId from "@/hooks/use-listId";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";
import { delete_link } from "@/server/actions/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFormLinks } from "../_components/data-table";

const useDeleteLink = () => {
  const listId = useListId();
  const queryKey = ["list_form_links", listId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: delete_link,
    onSuccess: async ({ message }, linkId) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<TFormLinks>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          links: oldData.links.filter((link) => link.id !== linkId),
        };
      });

      toast({
        title: "Success",
        description: message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useDeleteLink;
