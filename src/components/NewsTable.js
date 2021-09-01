import React from "react";
import { Link } from "react-router-dom";

function NewsTable({sortByDate, sortByName, appData, lastElementRef}) {
  return (
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
        return (
          <tr
            key={ el.id }
            onClick={() => console.log(el)}
            ref={i === appData.length - 1 ? lastElementRef : null}
          >
            <td>{ displayDate }</td>
            <td>
              <Link to={`comments/id${el.id}`}> {el.title} </Link>
            </td>
            <td>{ el.domain }</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  );
}

export default NewsTable;
