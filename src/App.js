import React, { useRef, useCallback } from "react";
import usePageFetch from "./customHooks/usePageFetch"

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
      <table border="1px">
        <thead>
          <tr>
            <td id="time" onClick={sortByDate}>Time added</td>
            <td id="title" onClick={sortByName}>Title</td>
            <td id="domain" onClick={sortByName}>Domain</td>
          </tr>
        </thead>
        <tbody>
          {appData.map((el, i) => {
            const date = new Date(el.time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
            const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
            const displayDate = [day, month, year].join("/");
            if (i === appData.length - 1) {
              return (
                <tr key={ el.id } ref={lastElementRef}>
                  <td>{ displayDate }</td>
                  <td>{ el.title }</td>
                  <td>{ el.domain }</td>
                </tr>
              )
            }
            return (
              <tr
                key={ el.id }
                onClick={() => console.log(el)}
              >
                <td>{ displayDate }</td>
                <td>{ el.title }</td>
                <td>{ el.domain }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {loading && !error && <p>Loading...</p>}
      {error && <p>Error: {errorText}</p>}
    </div>
  );
}

export default App;
