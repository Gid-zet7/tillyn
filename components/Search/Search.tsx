import React from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import SearchItemsCard from "./SearchItemsCard";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {
  productName: string | undefined;
  setProductName: any | undefined;
  openSearchForm: boolean | undefined;
  loadSearch: boolean | undefined;
  searchItems?: any | undefined;
  setSearchItems?: any | undefined;
  toggleSearchForm: (() => void | undefined) | undefined;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function Search({
  productName,
  setProductName,
  openSearchForm,
  loadSearch,
  searchItems,
  // setSearchItems,
  toggleSearchForm,
  handleSearch,
}: Props) {
  const dispatch = useDispatch();

  return (
    <>
      {/* Start of login form */}
      <div
        className={`h-screen fixed w-full md:w-[40rem] border z-50 right-0 transform ${
          openSearchForm ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-black flex flex-col items-center transition-transform duration-300 ease-in-out top-0 pt-6 overflow-y-auto overflow-x-hidden`}
      >
        <div className="flex justify-between w-11/12 ">
          <h2 className="text-black dark:text-white font-bold">Search</h2>
          <X className="cursor-pointer" onClick={toggleSearchForm} />
        </div>

        <hr className="bg-slate-700 w-full my-2" />

        <form onSubmit={handleSearch} className="w-11/12">
          <div className="my-4">
            <Input
              type="text"
              id="name"
              className="w-full p-2 border rounded "
              placeholder="search..."
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
          </div>

          <Button type="submit" className="w-full py-6 mb-4 rounded-md">
            {loadSearch ? <span className="loader"></span> : "Search"}
          </Button>
        </form>
        <div>
          {searchItems
            ? searchItems.map((item: Product, index: number) => (
                <SearchItemsCard
                  key={index}
                  productId={item._id}
                  price={item.price}
                  ratings={item.ratings}
                  imageSrc={item.image_url}
                  title={item.name}
                  stock={item.stock}
                  addToCart={() => dispatch(addToCart(item))}
                />
              ))
            : "No products found"}
        </div>
      </div>
      {/* End of search form */}
    </>
  );
}
