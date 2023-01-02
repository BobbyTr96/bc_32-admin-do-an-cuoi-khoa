import React from "react";

const Pagination = ({
  totalPageNumber,
  currentPage,
  paginate,
  handleNextBtn,
  handlePrevBtn,
  maxPageNumberLimit,
  minPageNumberLimit,
  IncreasePage,
  DecreasePage,
}) => {
  const pageNumber = []; // biến chứa số thứ tự button
  for (let i = 1; i <= totalPageNumber; i++) {
    pageNumber.push(i);
  }

  // dấu ... cạnh next button
  let pageIncremenBtn = null;
  if (pageNumber.length > maxPageNumberLimit) {
    pageIncremenBtn = (
      <li className="paginate-item" onClick={IncreasePage}>
        &hellip;
      </li>
    );
  }

  // dấu ... cạnh prev button
  let pageDecremenBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecremenBtn = (
      <li className="paginate-item" onClick={DecreasePage}>
        &hellip;
      </li>
    );
  }
  return (
    <div>
      <ul className="paginate">
        <div className="paginate-item" onClick={handlePrevBtn}>
          <button
            disabled={currentPage === pageNumber[0] ? true : false}
            className="paginate-button"
          >
            {"<"}-Prev--
          </button>
        </div>
        {pageDecremenBtn}
        {pageNumber.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <li
                key={number}
                className={
                  number === currentPage
                    ? "paginate-item active"
                    : "paginate-item"
                }
                onClick={() => paginate(number)}
              >
                <a>{number}</a>
              </li>
            );
          } else {
            return null;
          }
        })}

        {pageIncremenBtn}
        <div className="paginate-item" onClick={handleNextBtn}>
          <button
            disabled={
              currentPage === pageNumber[pageNumber.length - 1] ? true : false
            }
            className="paginate-button"
          >
            {" "}
            --Next-{">"}{" "}
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Pagination;
