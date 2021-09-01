import React from "react";

function useCommentsFetch(postId) {
  const [ data, setData ] = React.useState({});
  const [ loading, setLoading ] = React.useState(false);
  const [ error, setError ] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`https://api.hnpwa.com/v0/item/${postId}.json`)
      .then((r) => r.json())
      .then((r) => {
        setData(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
      })
  }, [])
  return { data, loading, error };
}

export default useCommentsFetch;
