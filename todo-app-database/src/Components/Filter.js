import React from 'react';
import '../Styles/filter.css';

function Filter({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>
        All
      </button>
      <button
        onClick={() => setFilter('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
      <button
        onClick={() => setFilter('pending')}
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending
      </button>
    </div>
  );
}

export default Filter;
