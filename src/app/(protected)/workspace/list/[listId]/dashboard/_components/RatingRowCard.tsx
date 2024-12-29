import { TRateDashboardData } from "@/lib/types";

interface RatingRowCardProps {
  data: TRateDashboardData;
}

const RatingRowCard = ({ data }: RatingRowCardProps) => {
  return (
    <div className="rounded border bg-white px-4 py-3 shadow-sm">
      <h1 className="font-bold">{data.name}</h1>
      <p className="text-sm font-semibold">
        Total rate: <span className="text-gray-700">{data.total_rate}</span>
      </p>
    </div>
  );
};

export default RatingRowCard;
