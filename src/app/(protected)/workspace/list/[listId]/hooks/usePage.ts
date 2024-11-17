import { parseAsInteger, useQueryState } from "nuqs";

export const usePage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0));

  return { page, setPage };
};
