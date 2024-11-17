"use client";
import { Button } from "@/components/ui/button";
import { usePage } from "../hooks/usePage";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  hasNextPage: boolean | undefined;
}

const Pagination = ({ hasNextPage }: PaginationProps) => {
  const { page, setPage } = usePage();

  const nextPage = () => {
    if (!hasNextPage) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page) {
      setPage(page - 1);
    } else {
      setPage(0);
    }
  };

  return (
    <div className="mt-2 flex items-center gap-2 self-end">
      <Button disabled={!page} onClick={prevPage} size="icon" variant="outline">
        <ArrowLeft />
      </Button>
      <Button
        size="icon"
        variant="outline"
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
