import useListId from "@/hooks/use-listId";
import { edit_link } from "@/server/actions/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFormLinks } from "../_components/data-table";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";

const useEditLink = () => {
  const listId = useListId();
  const queryKey = ["list_form_links", listId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: edit_link,
    onMutate: async ({ linkId, values }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TFormLinks>(queryKey);

      queryClient.setQueryData<TFormLinks>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          links: oldData.links.map((old) => {
            if (old.id === linkId) {
              return { ...old, ...values };
            }

            return old;
          }),
        };
      });

      return { prevData };
    },
    onError(error, _, context) {
      queryClient.setQueryData<TFormLinks>(queryKey, context?.prevData);

      toast({
        title: "Error",
        variant: "destructive",
        description: getErrorMessage(error),
      });
    },
  });
};

export default useEditLink;
