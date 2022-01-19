import { useState } from 'react';

export const usePagination = (items, numberOfPages) => {
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = numberOfPages;
  const pagesVisited = pageNumber * itemsPerPage;

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return { pagesVisited, pageCount, itemsPerPage, changePage };
};
