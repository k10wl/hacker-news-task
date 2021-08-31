import React, { useRef, useCallback } from "react";
import usePageFetch from "./customHooks/usePageFetch"

function App() {
  const [ pageNumber, setPageNumber ] = React.useState(1);
  const pageData = usePageFetch(pageNumber);
  const { news, loading, error } = pageData;
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
  return (
    <div>
      <table border="1px">
        <thead>
          <tr>
            <td>Time added</td>
            <td>Title</td>
            <td>Domain</td>
          </tr>
        </thead>
        <tbody>
          {news.map((el, i) => {
            if (i === news.length - 1) {
              return (
                <tr key={ el.id } ref={lastElementRef}>
                  <td>{ el.time }</td>
                  <td>{ el.title }</td>
                  <td>{ el.domain }</td>
                </tr>
              )
            }
            return (
              <tr
                key={ el.id }
                onClick={
                  () => el.url && window.open(el.url)
                }>
                <td>{ el.time }</td>
                <td>{ el.title }</td>
                <td>{ el.domain }</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {loading && !error && <p>Loading...</p>}
      {error && <p>Error!</p>}
    </div>
  );
}

export default App;
