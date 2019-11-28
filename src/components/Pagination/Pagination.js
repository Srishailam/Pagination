import React from 'react';
import '../Pagination/Pagination.scss';
const Pagination = (props) => {
  const {currentPage, totalPages, postsPerPage, paginate } = props;
  const pageNumber = [];
  for (let i=1; i<=Math.ceil(totalPages/postsPerPage); i++) {
    pageNumber.push(i);
  }
  let classNames = ['Pagination__pageNumber'];

  return (
      <div className="Pagination">
        {
          pageNumber.map( (number,idx) => {
            if (number === currentPage) {
              classNames.push('active');
            } else {
              classNames = ['Pagination__pageNumber'];
            }
            return (
              <div 
                key={idx} 
                className={classNames.join(' ')}
                onClick={() => paginate(number)}
              >
                {number}
              </div>
            )
          })
        }
      </div>
  )
}

export default Pagination