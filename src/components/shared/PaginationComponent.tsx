import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

type PaginationComponentProps = {
  meta: TMeta;
  onPageChange: (page: number) => void;
};

function PaginationComponent({ meta, onPageChange }: PaginationComponentProps) {
  const [currentPage, setCurrentPage] = useState(meta?.page);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };


  const renderPaginationItems = () => {
    const items = [];
    if (meta?.totalPage <= 3) {
      // Show all pages if total pages are 3 or less
      for (let i = 1; i <= meta?.totalPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show first, current, and last pages with ellipsis if total pages are more than 3
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={1 === currentPage}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      if (currentPage > 1 && currentPage < meta.totalPage) {
        items.push(
          <PaginationItem key={currentPage}>
            <PaginationLink
              isActive={true}
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < meta.totalPage - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={meta.totalPage}>
          <PaginationLink
            isActive={meta.totalPage === currentPage}
            onClick={() => handlePageChange(meta.totalPage)}
          >
            {meta.totalPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, meta.totalPage))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationComponent;
