import React, { useEffect, useRef, useState } from 'react';
import Page1 from "./features-pages/page-1";
import PageSelector from "./page-selector";
import Page2 from "./features-pages/page-2";
import Page3 from "./features-pages/page-3";

const FeaturesPage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 50)
  }, [page]);

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <></>
      ) : (
        <>
          {page === 1 && <Page1/>}
          {page === 2 && <Page2/>}
          {page === 3 && <Page3/>}
        </>
      )}

      <PageSelector page={page} setPage={setPage}/>
    </div>
  )
};

export default FeaturesPage;