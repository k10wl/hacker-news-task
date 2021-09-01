import React from "react";
import { useHistory } from "react-router-dom";
import "./stylesheet.css";

function NewsTable({sortByDate, sortByName, appData, lastElementRef}) {
  const mobileClient =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEmobileClient|Opera Mini/i.test(navigator.userAgent);
  const history = useHistory();
  return (
    <>
      <table className={mobileClient ? "mobileClient" : undefined}>
        <thead>
        <tr>
          { !mobileClient && <th id="time" onClick={ sortByDate }>Date</th> }
          <th id="title" onClick={sortByName}>Title</th>
          { !mobileClient && <th id="domain" className="domain" onClick={ sortByName }>Domain</th> }
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
              { !mobileClient && <td>{ displayDate }</td> }
              <td className="cell" onClick={() => {
                history.push(`comments/id${el.id}`);
              }}>
                <span> {el.title} </span>
              </td>
              { !mobileClient && <td className="domain">{ el.domain }</td>  }
            </tr>
          )
        })}
        </tbody>
      </table>
      <button
        style={{ display: mobileClient ? "block" : "none" }}
        className="sort_by_date"
        onClick={sortByDate}
      >
        Sort by date
      </button>
    </>
  );
}

export default NewsTable;
