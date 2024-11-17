import { Choice } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useChoices = (columnId: string) => {
  return useQuery({
    queryKey: ["column_choices", columnId],
    queryFn: () =>
      axios
        .get<Choice[]>(`/api/lists/column/${columnId}`)
        .then((res) => res.data),
  });
};

export default useChoices;
