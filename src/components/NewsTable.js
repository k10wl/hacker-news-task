import React from "react";

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
  );
}

export default NewsTable;
