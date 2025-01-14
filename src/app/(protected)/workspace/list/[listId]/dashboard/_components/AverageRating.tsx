import { getAverageRating } from "@/server/actions/list";
import AverageTable from "./AverageTable";

interface AverageRatingProps {
  listId: string;
}

const AverageRating = async ({ listId }: AverageRatingProps) => {
  const data = await getAverageRating({ listId, type: "RATING" });

  return <AverageTable data={data} />;
};

export default AverageRating;
