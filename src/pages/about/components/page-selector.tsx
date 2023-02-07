import React from 'react';

const PageSelector = ({ page, setPage }: { page: number, setPage: (fn: (page: number) => number) => void }) => {

  const currentPageStyle = 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
  const pageStyle = 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';

  const pages = [1, 2, 3, 4];

  const handlePrevious = () => {
    if (page === pages[0]) return;
    setPage(prev => prev - 1);
  }

  const handleNext = () => {
    if (page === pages[pages.length - 1]) return;
    setPage((prev: number) => prev + 1);
  }

  const PageItem = ({ currentPage }: { currentPage: number }) => {
    return (
      <li>
        <button
          type="button"
          onClick={() => setPage(() => currentPage)}
          className={page === currentPage ? currentPageStyle : pageStyle}>{currentPage}
        </button>
      </li>
    )
  }

  return (
    <nav className="sticky bottom-0">
      <ul className="flex mt-4 justify-center -space-x-px">
        <li>
          <button
            type="button"
            onClick={handlePrevious}
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous
          </button>
        </li>
        {[1, 2, 3, 4].map(pageItem => (
          <PageItem key={pageItem} currentPage={pageItem}/>
        ))}
        <li>
          <button
            onClick={handleNext}
            type="button"
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
          </button>
        </li>
      </ul>
    </nav>
  )
};

export default PageSelector;