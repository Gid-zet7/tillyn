"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/lib/actions";
// import Image from "next/image";
import { useAddNewProductMutation } from "@/redux/slices/productsApiSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoaderSimple from "@/components/Loader/Loader-simple/page";

export default function NewProductForm() {
  const [addNewProduct, { isLoading, isSuccess }] = useAddNewProductMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading product page:", err);
        //  setError("Failed to load product data.");
      }
    };

    fetchCategories();
  }, []);

  const fileSelected = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("ratings", ratings.toString());
        formData.append("size", size);
        formData.append("brand", brand);
        formData.append("stock", stock.toString());
        formData.append("category", category);
        formData.append("image", file);

        // // Debugging FormData
        // for (const pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }

        // Call the mutation
        const response = await addNewProduct(formData).unwrap();
        console.log("New product created successfully!", response);

        // Reset form state
        setName("");
        setDescription("");
        setPrice(0);
        setRatings(0);
        setSize("");
        setBrand("");
        setStock(0);
        setCategory("");
        setFile(undefined);
      } else {
        console.error("No file selected");
        // console.log("Please select a product image");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Error creating product:", errorMessage);
    }
  };

  const categoryOption = categories.map((category, i) => {
    return (
      <SelectItem value={category.name} key={i}>
        {category.name}
      </SelectItem>
    );
  });

  if (isLoading) return <LoaderSimple />;

  if (isSuccess) {
    console.log("Added new product");
  }

  //   if (isError) console.log(error);

  return (
    <>
      <div className="flex flex-col-reverse md:w-[60rem]">
        <div className="px-4 flex-1 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold my-4 grid place-content-center mt-6">
            Add a new product
          </h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 flex gap-10">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold mb-2 text-black text-xs"
                >
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-semibold text-xs mb-2 text-black"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-2 border rounded text-black"
                  // placeholder="enter your last name..."
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  value={price}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-semibold text-xs mb-2 text-black"
              >
                Product description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            <div className="flex gap-10 mb-4">
              <div>
                <label
                  htmlFor="ratings"
                  className="block font-semibold mb-2 text-black text-xs"
                >
                  Rating <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ratings?.toString()}
                  onValueChange={(value) => setRatings(parseFloat(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select rating</SelectLabel>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="4.5">4.5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* <select
                  id="ratings"
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setRatings(parseFloat(e.target.value))}
                  value={ratings}
                >
                  <option>Select rating</option>
                  <option>4</option>
                  <option>4.5</option>
                </select> */}
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block font-semibold mb-2 text-black text-xs"
                >
                  Your Brand Label <span className="text-red-500">*</span>
                </label>
                <select
                  id="brand"
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setBrand(e.target.value)}
                  value={brand}
                >
                  <option>Select status</option>
                  <option>Tillyn</option>
                </select>
              </div>
            </div>

            <div className="flex gap-10 mb-4">
              <div>
                <label
                  htmlFor="size"
                  className="block font-semibold mb-2 text-black text-xs"
                >
                  Available size(s) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="size"
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setSize(e.target.value)}
                  value={size}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block font-semibold text-xs mb-2 text-black"
                >
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full p-2 border rounded text-black"
                  // placeholder="enter your last name..."
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                  value={stock}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block font-semibold mb-2 text-black text-xs"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select rating</SelectLabel>
                    {categoryOption}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* <select
                id="category"
                className="w-full p-2 border rounded text-black"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>--Select category--</option>
                {categoryOption}
              </select> */}
            </div>
            <div>
              <div>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={fileSelected}
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-black py-6 text-white rounded-md"
              >
                Add Product
              </button>
              <button
                type="button"
                className="w-full bg-black/50 py-6 text-white rounded-md"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
