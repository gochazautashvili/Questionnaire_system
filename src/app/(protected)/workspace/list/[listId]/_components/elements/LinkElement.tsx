import { Link } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface LinkElementProps {
  linkId: string;
  type: "name" | "location";
}

const LinkElement = ({ linkId, type }: LinkElementProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["list_link", linkId],
    queryFn: () =>
      axios.get<Link>(`/api/link/${linkId}`).then((res) => res.data),
  });

  if (isLoading) return <p>loading...</p>;

  if (!data) return <p className="text-gray-500">link not found</p>;

  switch (type) {
    case "name":
      return <p>{data.name}</p>;
    case "location":
      return <p>{data.location}</p>;
    default:
      return null;
  }
};

export default LinkElement;
