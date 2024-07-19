import React from 'react';
import '../Styles/filter.css';

function Filter({ filter, setFilter, count }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        All ({count})
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed ({count})
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending ({count})
      </button>
    </div>
  );
}

export default Filter;
