import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { usePagination } from './hooks/usePagination';
import styled from 'styled-components';

export const Paginate = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { pagesVisited, pageCount, itemsPerPage, changePage } = usePagination(
    users,
    4
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        setUsers(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && !users && <p>Carregando...</p>}
      <ul>
        {!isLoading &&
          users &&
          users
            .slice(pagesVisited, pagesVisited + itemsPerPage)
            .map((comment) => <li key={comment.id}>{comment.name}</li>)}
      </ul>

      <Container>
        <ReactPaginate
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          previousLabel={'Anterior'}
          nextLabel={'Próxima'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'containerClassName'}
          previousLinkClassName={'previousLinkClassName'}
          nextLinkClassName={'nextLinkClassName'}
          disabledClassName={'disabledClassName'}
          activeClassName={'activeClassName'}
        />
      </Container>
    </div>
  );
};

const Container = styled.div`
  background-color: red;

  .containerClassName {
    display: flex;
    gap: 20px;

    li {
      list-style: none;
      cursor: pointer;
    }
  }
`;
