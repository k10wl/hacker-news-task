import React, { useRef, useCallback } from "react";
import usePageFetch from "./customHooks/usePageFetch"
import NewsTable from "./components/NewsTable";

function App() {
  const [ appData, setAppData ] = React.useState([]);
  const [ pageNumber, setPageNumber ] = React.useState(1);
  const pageData = usePageFetch(pageNumber);
  const { news, loading, error, errorText } = pageData;
  const observer = useRef(null);
  const lastElementRef = useCallback((node) => {
    if (loading) {
      return
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading]);
  React.useEffect(() => {
    if (!loading && !error) {
      setAppData(news);
    }
  }, [loading, news, error, pageNumber])
  function sortByDate() {
    const sorted = appData.sort((a, b) => b.time - a.time);
    setAppData([...sorted]);
  }
  function sortByName(e) {
    const sorted = appData.sort((a, b) => a[e.target.id].localeCompare(b[e.target.id]));
    setAppData([...sorted]);
  }
  return (
    <div>
      <NewsTable
        sortByName={sortByName}
        appData={appData}
        sortByDate={sortByDate}
        lastElementRef={lastElementRef}
      />
      {loading && !error && <p>Loading...</p>}
      {error && <p>Error: {errorText}</p>}
    </div>
  );
}

export default App;
