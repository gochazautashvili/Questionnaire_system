import { Column } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useListColumns = (listId: string) => {
  return useQuery({
    queryKey: ["list_columns", listId],
    queryFn: () =>
      axios
        .get<Column[]>(`/api/lists/${listId}/columns`)
        .then((res) => res.data),
  });
};

export default useListColumns;
