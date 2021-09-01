import React from "react";

function UsePageFetch(hackerNewsPage, pageNumber) {
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const [ hasMore, setHasMore ] = React.useState(true);
  const [ news, setNews ] = React.useState([]);
  React.useEffect(() => {
    setNews([]);
  }, []);
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    setError(false);
    fetch(`https://api.hnpwa.com/v0/${hackerNewsPage}/${pageNumber}.json`, {
      method: "get",
      signal,
    })
      .then((r) => r.json())
      .then((r) => {
        setLoading(false);
        const combinedData = [...news, ...r.map((el) => ({
          id: el.id,
          time: el.time * 1000,
          title: el.title,
          domain: el.domain ? el.domain : "news.ycombinator.com",
        }))];
        const uniqueNews = combinedData.filter((el, index, self) =>
          index === self.findIndex((t) => (
            t.id === el.id
          ))
        )
        setNews(uniqueNews);
        if (hackerNewsPage === "news" && pageNumber > 10) {
          setHasMore(false);
        }
        if (hackerNewsPage === "newest" && pageNumber > 12) {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setError(true);
        console.log(e)
      })
    return () => controller.abort();
  }, [pageNumber]);
  return { news, loading, error, hasMore }
}

export default UsePageFetch;
