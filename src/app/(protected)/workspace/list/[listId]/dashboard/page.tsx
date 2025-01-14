import { Suspense } from "react";
import AverageRating from "./_components/AverageRating";
import AverageNPSRating from "./_components/AverageNPSRating";
import TableLoading from "./_components/TableLoading";
import ChoicesChart from "./_components/ChoicesChart";

interface ListDashboardPageProps {
  params: { listId: string };
}

const ListDashboardPage = (props: ListDashboardPageProps) => {
  const { params } = props;

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-1 rounded-md bg-white/90 p-3">
        <h1 className="text-lg font-semibold">Average rating</h1>
        <Suspense fallback={<TableLoading />}>
          <AverageRating listId={params.listId} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-1 rounded-md bg-white/90 p-3">
        <h1 className="text-lg font-semibold">Average SNP rating</h1>
        <Suspense fallback={<TableLoading />}>
          <AverageNPSRating listId={params.listId} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-1 rounded-md bg-white/90 p-3">
        <h1 className="text-lg font-semibold">Most selected choices</h1>
        <Suspense fallback={<TableLoading />}>
          <ChoicesChart listId={params.listId} />
        </Suspense>
      </div>
    </section>
  );
};

export default ListDashboardPage;
