import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Pagination: React.FC<{ totalItems: number, perPage: number }> = ({ totalItems, perPage }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [currentPage, setCurrentPage] = useState(+page);

  const lastPage = Math.ceil(totalItems / perPage);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(+page);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [page]);


  let pageNr = [];
  for (let i = 1; i <= lastPage; i++) {
    pageNr.push(i);
  }

  const prevHandler = () => {
    if (+page === 1 || +page <= 0) return;

    const newPage = currentPage - 1;
    setCurrentPage(newPage);

    if (pathname.includes("products")) {
      navigate(`/demo/abyssal-shopping/products?page=${newPage}`);
    } else if (pathname.includes("my-products")) {
      navigate(`/demo/abyssal-shopping/my-products?page=${newPage}`);
    } else {
      navigate(`/demo/abyssal-shopping/orders?page=${newPage}`);
    }
  };

  const nextHandler = () => {
    if (+page >= lastPage) return;

    const newPage = currentPage + 1;
    setCurrentPage(newPage);

    if (pathname.includes("products")) {
      navigate(`/demo/abyssal-shopping/products?page=${newPage}`);
    } else if (pathname.includes("my-products")) {
      navigate(`/demo/abyssal-shopping/my-products?page=${newPage}`);
    } else {
      navigate(`/demo/abyssal-shopping/orders?page=${newPage}`);
    }
  };

  const pageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedPage = +e.currentTarget.value;
    setCurrentPage(clickedPage);

    if (pathname.includes("products")) {
      navigate(`/demo/abyssal-shopping/products?page=${clickedPage}`);
    } else if (pathname.includes("my-products")) {
      navigate(`/demo/abyssal-shopping/my-products?page=${clickedPage}`);
    } else {
      navigate(`/demo/abyssal-shopping/orders?page=${clickedPage}`);
    }
  };

  return (
    <div className="flex justify-center items-center p-8 m-6 md:m-8 lg:m-4">
      <div className="flex flex-wrap justify-center items-center gap-2">
        {totalItems !== 0 && +page >= 1 && (
          <button
            onClick={prevHandler}
            className="h-8 w-8 rounded-full bg-[rgb(85,1,125)] text-white inline-flex items-center justify-center mx-1 cursor-pointer
             hover:bg-white hover:text-[rgb(85,1,125)] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        {pageNr.map((num) => (
          <button
            key={num}
            value={num}
            onClick={pageHandler}
            className={`w-9 h-9 px-1 py-1 text-[rgb(85,1,125)] font-inherit text-center cursor-pointer rounded-full border border-transparent
              ${+page === num
                ? "bg-[rgb(85,1,125)] text-white border-[rgb(85,1,125)]"
                : "bg-transparent"
              }
              hover:bg-[rgb(85,1,125)] hover:text-white hover:border-[rgb(85,1,125)] transition-colors`}
          >
            {num}
          </button>
        ))}

        {+page <= lastPage && (
          <button
            onClick={nextHandler}
            className="h-8 w-8 rounded-full bg-[rgb(85,1,125)] text-white inline-flex items-center justify-center mx-1 cursor-pointer
             hover:bg-white hover:text-[rgb(85,1,125)] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
