import React from "react";
import axios from "axios";

function UsePageFetch(pageNumber) {
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  const [ news, setNews ] = React.useState([]);
  React.useEffect(() => {
    setNews([]);
  }, []);
  React.useEffect(() => {
    let cancel
    setLoading(true);
    setError(false);
    axios({
      method: "get",
      url: `https://api.hnpwa.com/v0/news/${pageNumber}.json`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then((r) => {
        console.log(r);
        setLoading(false);
        setNews((prevState) =>
          [...new Set ([
            ...prevState,
            ...r.data.map((el) => ({
              id: el.id,
              time: el.time * 1000,
              title: el.title,
              domain: el.domain,
              url: el.url ? el.url : null,
            }))
          ])]
        )
      })
      .catch((e) => {
        setError(true);
      })
    return () => cancel();
  }, [pageNumber]);
  return { news, loading, error }
}

export default UsePageFetch;
