import { Suspense } from "react";
import RatingRowCards from "./_components/RatingRowCards";

interface ListDashboardPageProps {
  params: { listId: string };
}

const ListDashboardPage = async (props: ListDashboardPageProps) => {
  const { params } = props;

  return (
    <section>
      <Suspense fallback={<RatingRowCardsLoading />}>
        <RatingRowCards listId={params.listId} />
      </Suspense>
    </section>
  );
};

export default ListDashboardPage;

const RatingRowCardsLoading = () => {
  return <div>loading</div>;
};
