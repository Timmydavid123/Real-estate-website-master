// components/Pagination.js
import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './pagination.css';

function Pagination({ propertiesPerPage, totalProperties, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalProperties === 0) {
    return <p className="pagination-error">No properties found.</p>;
  }

  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <nav className="pagination">
      {currentPage > 1 && (
        <button onClick={() => paginate(currentPage - 1)} className="pagination-button">
          <FaChevronLeft />
        </button>
      )}

      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={`pagination-button ${number === currentPage ? 'active' : ''}`}>
          {number}
        </button>
      ))}

      {currentPage < pageNumbers.length && (
        <button onClick={() => paginate(currentPage + 1)} className="pagination-button">
          <FaChevronRight />
        </button>
      )}
    </nav>
  );
}

export default Pagination;
