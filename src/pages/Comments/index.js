import React from "react";
import useCommentsFetch from "../../customHooks/useCommentsFetch";

function Comments({ location:  { pathname } }) {
  const id = pathname.split("/").pop().replace("id", "");
  const { data, loading, error } = useCommentsFetch(id)
  if (loading) {
    return <h1>Loading</h1>
  }
  if (error) {
    console.log(error);
    return <h1>Something went wrong!</h1>
  }
  return (
    <div>
      <h1 align="center">{data.title}</h1>
      <hr />
      {data?.comments?.map((el) => {
        return (
          <div key={el.id} >
            <div dangerouslySetInnerHTML={ { __html: el.content } }/>
            <hr />
          </div>);
      })}
    </div>
  );
}

export default Comments;
