import { TRateDashboardData } from "@/lib/types";

interface AverageTableProps {
  data: TRateDashboardData[];
}

const AverageTable = ({ data }: AverageTableProps) => {
  return (
    <table className="w-full bg-slate-100 p-1 text-left">
      <thead>
        <tr>
          <th className="border border-black px-3 py-1">ID</th>
          <th className="border border-black px-3 py-1">Column name</th>
          <th className="border border-black px-3 py-1">Average rating</th>
        </tr>
      </thead>
      <tbody>
        {!data.length && (
          <tr>
            <td
              colSpan={3}
              className="border border-black py-4 text-center text-sm text-destructive"
            >
              This type of column not found
            </td>
          </tr>
        )}
        {!!data.length &&
          data.map((item, i) => (
            <tr key={item.id}>
              <td className="border border-black px-3 py-1">{i + 1}</td>
              <td className="border border-black px-3 py-1">{item.name}</td>
              <td className="border border-black px-3 py-1">
                {item.average_rating}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default AverageTable;
