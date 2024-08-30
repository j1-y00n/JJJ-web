import { useState } from 'react';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

export function usePagination<T>({
  data,
  itemsPerPage,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const displayedItems = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalItems = data.length;

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    displayedItems,
    currentPage,
    itemsPerPage,
    paginate,
    totalItems,
  };
}
