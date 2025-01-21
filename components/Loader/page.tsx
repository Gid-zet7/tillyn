import React from "react";
import { useState, useEffect } from "react";

type Props = {
  message: string | undefined;
};

export default function Loader({ message }: Props) {
  const [snackbar, setSnackbar] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const snackbar = document.getElementById("snackbar");

    setSnackbar(snackbar);
  }, []);

  function closeSnackbar() {
    if (snackbar) snackbar.style.display = "none";
  }
  return (
    <>
      <div
        id="snackbar"
        className={`${
          message === "Adding to cart" ? "bg-black" : "bg-orange-300"
        } text-white px-4 py-2  rounded-md fixed bottom-12 right-20 md:right-2/4 flex justify-between items-center z-50 gap-6`}
        style={{ display: "block" }}
      >
        {message}
        <span className="loader"></span>
        <button className="text-white" onClick={closeSnackbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
