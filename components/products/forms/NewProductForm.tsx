"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/lib/actions";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export default function NewProductForm() {
  const [addNewProduct, { isLoading, isSuccess }] = useAddNewProductMutation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [size, setSize] = useState("");
  const [sizeError, setSizeError] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const router = useRouter();

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

  const validateSizeFormat = (value: string) => {
    // Empty is valid as it will be caught by required field validation
    if (!value.trim()) {
      setSizeError("");
      return true;
    }

    // Check if the string follows the format: "S, M, L" or "S,M,L"
    const sizePattern = /^[A-Za-z0-9]+(?:\s*,\s*[A-Za-z0-9]+)*$/;
    const isValid = sizePattern.test(value.trim());

    if (!isValid) {
      setSizeError("Please enter sizes in the correct format (e.g., S, M, L)");
      return false;
    }

    setSizeError("");
    return true;
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSize(value);
    validateSizeFormat(value);
  };

  const handleSubmit = async () => {
    try {
      // Validate size format before submission
      if (!validateSizeFormat(size)) {
        return;
      }

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
        await addNewProduct(formData).unwrap();
        // console.log("New product created successfully!", response);

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
      <div className="flex flex-col-reverse w-full md:w-[60rem] px-4 md:px-0">
        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold my-4 grid place-content-center mt-6">
            Add a new product
          </h1>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            {/* Name and Price */}
            <div className="mb-4 flex flex-col md:flex-row md:gap-10 gap-4">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block font-semibold mb-2  text-xs"
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
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="block font-semibold text-xs mb-2 "
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-2 border rounded "
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  value={price}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block font-semibold text-xs mb-2 "
              >
                Product description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded  min-h-[100px]"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>

            {/* Rating and Category */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="ratings"
                  className="block font-semibold mb-2 text-xs"
                >
                  Rating <span className="text-red-500">*</span>
                </label>
                <Select
                  value={ratings?.toString()}
                  onValueChange={(value) => setRatings(parseFloat(value))}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
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
              </div>
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block font-semibold mb-2  text-xs"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select category</SelectLabel>
                      {categoryOption}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Size and Stock */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-10 mb-4">
              <div className="flex-1">
                <label
                  htmlFor="size"
                  className="block font-semibold mb-2  text-xs"
                >
                  Available size(s) <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    id="size"
                    className={`w-full p-2 border rounded text-black ${
                      sizeError ? "border-red-500" : ""
                    }`}
                    onChange={handleSizeChange}
                    value={size}
                    placeholder="Enter sizes separated by commas (e.g. S, M, L, XL)"
                  />
                  {sizeError ? (
                    <p className="text-xs text-red-500">{sizeError}</p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Enter sizes separated by commas (e.g. S, M, L, XL)
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label
                  htmlFor="stock"
                  className="block font-semibold text-xs mb-2"
                >
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full p-2 border rounded text-black"
                  onChange={(e) => setStock(parseInt(e.target.value, 10))}
                  value={stock}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <div className="w-full">
                <Label htmlFor="picture" className="mb-2 block">
                  Picture
                </Label>
                <Input
                  id="picture"
                  type="file"
                  onChange={fileSelected}
                  accept="image/*"
                  className="w-full"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Button
                type="button"
                onClick={handleSubmit}
                className="w-full py-4 md:py-6 rounded-md text-sm md:text-base"
              >
                Add Product
              </Button>
              <Button
                type="button"
                variant={"outline"}
                className="w-full bg-black py-4 md:py-6 rounded-md text-sm md:text-base"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
