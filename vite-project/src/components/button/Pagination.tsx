import { useEffect, useState } from 'react';
import Btn from './Btn';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  useEffect(() => {
    // 현재 페이지 주변에 보여질 페이지 개수
    const visiblePagesCount = 10;
    const pages: number[] = [];

    if (totalPages <= visiblePagesCount) {
      // 전체 페이지 수가 보여질 페이지 개수보다 작으면 모든 페이지를 보여줌
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(visiblePagesCount / 2);
      let start = currentPage - halfVisible;
      let end = currentPage + halfVisible;

      if (start < 1) {
        // 현재 페이지 주변에 남은 공간이 없을 때
        start = 1;
        end = visiblePagesCount;
      } else if (end > totalPages) {
        start = totalPages - visiblePagesCount + 1;
        end = totalPages;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    setVisiblePages(pages);
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div >
      {currentPage > 1 && (
        <Btn
          size="small"
          txt="이전"
          handleBtn={() => handlePageChange(currentPage - 1)}
          className='mr-1'
        />
      )}
      {visiblePages.map((page) => (
        <Btn
          key={page}
          size="small"
          txt={`${page}`}
          buttonColor={currentPage === page ? 'primary' : 'secondary'}
          handleBtn={() => handlePageChange(page)}
          className='mr-1'
        />
      ))}
      {totalPages > 10 && currentPage < totalPages - 4 && <Btn size="small" txt="..." /> }
      {currentPage < totalPages && (
        <Btn
          size="small"
          txt="다음"
          handleBtn={() => handlePageChange(currentPage + 1)}
        />
      )}
    </div>
  );
}

export default Pagination;
