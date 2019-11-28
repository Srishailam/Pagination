import React from 'react';

import './PaginationInfo.scss';
const PaginationInfo = (props) => {
  const { from = 0, to = 0, totalCount = 0 } = props;
  return (
    <div className="PaginationInfo">
      {`Showing ${from} - ${to} of ${totalCount} records`}
    </div>
  );
}

export default PaginationInfo;