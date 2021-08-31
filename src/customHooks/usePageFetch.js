import React from "react";
import axios from "axios";

function UsePageFetch(hackerNewsPage, pageNumber) {
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const [ errorText, setErrorText ] = React.useState("");
  const [ news, setNews ] = React.useState([]);
  React.useEffect(() => {
    setNews([]);
  }, []);
  React.useEffect(() => {
    let cancel
    setLoading(true);
    setError(false);
    setErrorText("");
    axios({
      method: "get",
      url: `https://api.hnpwa.com/v0/${hackerNewsPage}/${pageNumber}.json`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then((r) => {
        setLoading(false);
        const combinedData = [...news, ...r.data.map((el) => ({
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
      })
      .catch((e) => {
        console.log(e.toJSON())
        setError(true);
        setErrorText(e.toJSON().message);
      })
    return () => cancel();
  }, [pageNumber]);
  return { news, loading, error, errorText }
}

export default UsePageFetch;
