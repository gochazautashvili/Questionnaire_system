import { getSelectedChoices } from "@/server/actions/list";
import { ChoiceChart } from "./ChoiceChart";

interface ChoicesChartProps {
  listId: string;
}

const ChoicesChart = async ({ listId }: ChoicesChartProps) => {
  const data = await getSelectedChoices(listId);

  return (
    <section className="flex flex-wrap gap-5">
      {data.map((item) => (
        <ChoiceChart key={item.id} data={item} />
      ))}
    </section>
  );
};

export default ChoicesChart;
