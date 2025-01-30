import React from "react";
import { addToCart } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { ToastAction } from "@/components/ui/toast";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "../homepage/Card";
import SearchItemsCard from "./SearchItemsCard";

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
  const { toast } = useToast();
  const router = useRouter();

  console.log(searchItems);

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
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
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
