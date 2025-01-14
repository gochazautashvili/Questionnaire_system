import { getAverageRating } from "@/server/actions/list";
import AverageTable from "./AverageTable";

interface AverageNPSRatingProps {
  listId: string;
}

const AverageNPSRating = async ({ listId }: AverageNPSRatingProps) => {
  const data = await getAverageRating({ listId, type: "NPS" });

  return <AverageTable data={data} />;
};

export default AverageNPSRating;
