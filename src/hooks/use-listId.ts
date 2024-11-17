import { useParams } from "next/navigation";

const useListId = () => {
  const params: { listId: string } = useParams();

  return params.listId;
};

export default useListId;
