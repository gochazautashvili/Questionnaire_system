import { getListRatingData } from "@/server/actions/list";
import RatingRowCard from "./RatingRowCard";

interface RatingRowCardsProps {
  listId: string;
}

const RatingRowCards = async ({ listId }: RatingRowCardsProps) => {
  const data = await getListRatingData(listId);

  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item) => {
        return <RatingRowCard data={item} key={item.id} />;
      })}
    </div>
  );
};

export default RatingRowCards;
