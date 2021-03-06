import React from "react";
import usePageFetch from "../../customHooks/usePageFetch";
import NewsTable from "../../components/NewsTable";
import { useStore } from "../../store/Store";
import { addData } from "../../store/actions";
import "./newsTab.css";

function NewsTab({ location: { pathname } }) {
  const [ url ] = React.useState(pathname.replace("/", ""));
  const [state, dispatch] = useStore();
  const { [url]: localState } = state;
  const data = localState ? localState : [[]];
  const [ appData, setAppData ] = React.useState(...data);
  React.useEffect(() => {
    if (localState) {
      setAppData(...data)
    }
  }, [data])
  const [ pageNumber, setPageNumber ] = React.useState(1);
  const pageData = usePageFetch(url, pageNumber);
  const { news, loading, error, hasMore } = pageData;
  const observer = React.useRef(null);
  const lastElementRef = React.useCallback((node) => {
    if (loading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    if (!hasMore) {
      return;
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.current.disconnect();
        setPageNumber(pageNumber + 1);
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading]);
  React.useEffect(() => {
    if (!loading && !error && news.length !== 0) {
      // setAppData(news);
      dispatch(addData({target: url, data: news}))
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
    <div className="table component-root">
      <h2>{url[0].toUpperCase()}{[...url.slice(1)]}</h2>
      <NewsTable
        sortByName={sortByName}
        appData={appData}
        sortByDate={sortByDate}
        lastElementRef={lastElementRef}
      />
      {loading && !error && <p className="text-after-table">Loading...</p>}
      {!hasMore  && !loading && <p className="text-after-table">There is nothing left. Come back later.</p>}
    </div>
  );
}

export default NewsTab;
