import useListId from "@/hooks/use-listId";
import { edit_link_name } from "@/server/actions/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFormLinks } from "../_components/data-table";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/utils";

const useEditLinkName = () => {
  const listId = useListId();
  const queryKey = ["list_form_links", listId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: edit_link_name,
    onMutate: async ({ linkId, name, type }) => {
      await queryClient.cancelQueries({ queryKey });

      const prevData = queryClient.getQueryData<TFormLinks>(queryKey);

      queryClient.setQueryData<TFormLinks>(queryKey, (oldData) => {
        if (!oldData) return;

        return {
          ...oldData,
          links: oldData.links.map((link) => {
            if (link.id === linkId) {
              switch (type) {
                case "name":
                  return { ...link, name };
                case "code":
                  return { ...link, code: name };
                case "location":
                  return { ...link, location: name };
              }
            }

            return link;
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

export default useEditLinkName;
