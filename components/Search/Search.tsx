import React from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  // session: any;
  name: string | undefined;
  setName: any | undefined;
  openSearchForm: boolean | undefined;
  loadSearch: boolean | undefined;
  searchItems?: any | undefined;
  setSearchItems?: any | undefined;
  toggleSearchForm: (() => void | undefined) | undefined;
  handleSearch:
    | ((e: React.FormEvent<HTMLFormElement>) => void | undefined)
    | undefined;
  toggleRegisterForm: (() => void | undefined) | undefined;
  toggleLoginForm: (() => void | undefined) | undefined;
};

export default function Search({
  name,
  setName,
  openSearchForm,
  loadSearch,
  searchItems,
  setSearchItems,
  toggleSearchForm,
  handleSearch,
  toggleRegisterForm,
  toggleLoginForm,
}: Props) {
  return (
    <>
      {/* Start of login form */}
      <div
        className={`h-screen fixed w-full md:w-[30rem] border z-50 right-0 transform ${
          openSearchForm ? "translate-x-0" : "translate-x-full"
        } bg-white flex flex-col items-center transition-transform duration-300 ease-in-out top-0 pt-6 overflow-y-auto overflow-x-hidden`}
      >
        <div className="flex justify-between w-11/12 ">
          <h2 className="text-black font-bold">Search</h2>
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={toggleSearchForm}
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M7 17L16.8995 7.10051"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7.00001L16.8995 16.8995"
              stroke="#000000"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <hr className="bg-slate-700 w-[20rem] md:w-[30rem] my-2" />

        <form onSubmit={handleSearch} className="w-11/12">
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded bg-slate-100 text-black"
              placeholder="search..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black/50 py-6 mb-4 rounded-md"
          >
            {loadSearch ? <span className="loader"></span> : "Search"}
          </button>
        </form>
        <div>
          {searchItems
            ? searchItems.map((item: Product, i: number) => (
                <Link
                  key={i}
                  href={`http://localhost:3000/products/${item._id}`}
                >
                  <div className="w-full flex px-6 py-4 gap-4 hover:bg-slate-50">
                    <img
                      width={300}
                      height={300}
                      src={item?.image_url}
                      alt={item.name}
                      className="h-36 w-28 object-cover"
                    />

                    <div className="text-black flex flex-col justify-center gap-4 items-center">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between mt-4 items-center text-black">
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                        </div>
                        {item.ratings === 4 ? (
                          <div className="flex gap-1">
                            {" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star-black.svg"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            {" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/star.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />{" "}
                            <Image
                              src={"/favorite.png"}
                              width={15}
                              height={15}
                              alt="review stars"
                            />
                          </div>
                        )}
                        <h2>GHS {item.price}</h2>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : "No products found"}
        </div>
      </div>
      {/* End of search form */}
    </>
  );
}
